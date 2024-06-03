
var featuresList = glue.tableToObjects(
		
		glue.command(["list", "feature", "-w", "featureMetatags.name = 'CODES_AMINO_ACIDS' and featureMetatags.value = true", "name", "displayName", "parent.name"]));

//glue.log("INFO", "ID RESULT WAS ", featuresList);

var comparisonRefName = "REF_MASTER_DENV1";
var replacementsSet = {};

// production
var whereClause = "sequence.source.name = 'fasta-refseqs-yale-denv1'";


_.each(featuresList, function(featureObj) {

    if(featureObj.name == "non_structural_proteins") {
		return; 
    }
    if(featureObj.name == "precursor_polyprotein") {
		return; 
    }
    if(featureObj.name == "structural_proteins") {
		return; 
    }

	var refAaObjsMap = {};
	glue.inMode("reference/"+comparisonRefName+"/feature-location/"+featureObj.name, function() {
	
		var refAaObjs = glue.tableToObjects(glue.command(["amino-acid"]));
		
		_.each(refAaObjs, function(refAaObj) {
			refAaObjsMap[refAaObj.codonLabel] = refAaObj;
		});
	
	});
	
	glue.inMode("alignment/AL_DENV_1", function() {
	
		var almtMemberObjs = glue.tableToObjects(glue.command(["list", "member", "-w", whereClause]));
		var processed = 0;

		_.each(almtMemberObjs, function(almtMemberObj) {
		
			glue.inMode("member/"+almtMemberObj["sequence.source.name"]+"/"+almtMemberObj["sequence.sequenceID"], function() {
			
				var memberAaObjs = glue.tableToObjects(glue.command(["amino-acid", "-r", comparisonRefName, "-f", featureObj.name]));
			   
				_.each(memberAaObjs, function(memberAaObj) {
				
					// Require no Ns in the codonNts in order to generate a replacement,
					// unless the replacement is unambiguously a single AA residue.
					// This means we are interpreting N as 'unable to sequence' rather than
					// 'equal proportion A, C, G, T'  
					//glue.log("INFO", "Amino acid RESULT WAS ", memberAaObj);

					
					if(memberAaObj.definiteAas != null && memberAaObj.definiteAas != "" &&
					  (memberAaObj.definiteAas.length == 1 || memberAaObj.codonNts.indexOf('N') < 0)) {
					  
						refAaObj = refAaObjsMap[memberAaObj.codonLabel];
						
						
						if(refAaObj != null && refAaObj.definiteAas != null && refAaObj.definiteAas != "" && 
								refAaObj.definiteAas != memberAaObj.definiteAas) {
							
							var refAas = refAaObj.definiteAas.split('');
							
							var memberAas = memberAaObj.definiteAas.split('');
							
							_.each(refAas, function(refAa) {
							
								_.each(memberAas, function(memberAa) {
								
									if(refAa != memberAa) {
									
										//glue.log("INFO", "Replacement amino acid RESULT WAS ", memberAaObj);
									
										var replacementID = featureObj.name+":"+refAa+":"+memberAaObj.codonLabel+":"+memberAa;
										var replacementObj = replacementsSet[replacementID];
										
										if(replacementObj == null) {
										
											replacementObj = {
												id: replacementID,
												feature: featureObj.name,
												parentFeature: featureObj["parent.name"],
												codonLabel: memberAaObj.codonLabel,
												refNt: memberAaObj.relRefNt,
												refAa: refAa,
												replacementAa: memberAa,
												memberSeqs: []
											};
											replacementsSet[replacementID] = replacementObj; // Make sure to add the new object to the set
										
										}
										
										replacementObj.memberSeqs.push(almtMemberObj);
									}
								
								});
							
							});
						
						}
					
					}
				
				});
				processed++;
				if(processed % 500 == 0) {
					glue.logInfo("Processed for replacements in "+featureObj.name+": "+processed+" sequences. ");
					glue.command(["new-context"]);
				}
			});
			
		}); 
	});
	
});

//glue.log("INFO", "FINAL RESULT WAS ", replacementsSet);


processed = 0;


_.each(_.values(replacementsSet), function(replacementObj) {

	//glue.log("INFO", "Creating replacement object", replacementObj);

	var variationName = "denv_aa_rpl:"+replacementObj.id;
	var variationExists = false;
	
	glue.inMode("reference/REF_MASTER_DENV1/feature-location/"+replacementObj.feature, function() {
		var existing = glue.tableToObjects(glue.command(["list", "variation", "-w", "name = '"+variationName+"'"]));
		if(existing.length > 0) {
			variationExists = true;
		}
		if(!variationExists) {
		
			glue.command(["create", "variation", variationName, 
				"-t", "aminoAcidSimplePolymorphism", 
				"--labeledCodon", replacementObj.codonLabel, replacementObj.codonLabel]);
				
			glue.inMode("variation/"+variationName, function() {
			
				glue.command(["set", "metatag", "SIMPLE_AA_PATTERN", replacementObj.replacementAa]);
				glue.command(["set", "metatag", "MIN_COMBINED_TRIPLET_FRACTION", 0.25]);
			
			});
			
		}
	});

	if(!variationExists) {
			
		glue.command(["create", "custom-table-row", "denv_replacement", replacementObj.id]);
		glue.inMode("custom-table-row/denv_replacement/"+replacementObj.id, function() {

			var displayName = replacementObj.refAa+replacementObj.codonLabel+replacementObj.replacementAa;
			glue.command(["set", "field", "display_name", displayName]);
			glue.command(["set", "field", "codon_label", replacementObj.codonLabel]);		
			glue.command(["set", "field", "codon_label_int", parseInt(replacementObj.codonLabel)]);		
			glue.command(["set", "field", "reference_nt", replacementObj.refNt]);
			glue.command(["set", "field", "reference_aa", replacementObj.refAa]);
			glue.command(["set", "field", "replacement_aa", replacementObj.replacementAa]);
			
			glue.command(["set", "link-target", "variation", 
				"reference/REF_MASTER_DENV1/feature-location/"+replacementObj.feature+
				"/variation/"+variationName]);

		});

	}

	
	_.each(replacementObj.memberSeqs, function(memberObj) {
	
		var sourceName = memberObj["sequence.source.name"];
		var sequenceID = memberObj["sequence.sequenceID"];
		var linkObjId = replacementObj.id+":"+sourceName+":"+sequenceID;
		var variation_present = true;
		
		glue.command(["create", "custom-table-row", "denv_replacement_sequence", linkObjId]);
		
		glue.inMode("custom-table-row/denv_replacement_sequence/"+linkObjId, function() {
			glue.command(["set", "link-target", "denv_replacement", "custom-table-row/denv_replacement/"+replacementObj.id]);
			glue.command(["set", "link-target", "sequence", "sequence/"+sourceName+"/"+sequenceID]);
		});
		
		glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
			glue.command(["set", "field", "variation_present", variation_present]);
		});
		
	});
	
	
	processed++;
	if(processed % 500 == 0) {
		glue.logInfo("Ensured creation / associated "+processed+" replacements. ");
		glue.command(["commit"]);
		glue.command(["new-context"]);
	}

});

glue.logInfo("Ensured creation / associated "+processed+" replacements. ");
glue.command(["commit"]);
glue.command(["new-context"]);
