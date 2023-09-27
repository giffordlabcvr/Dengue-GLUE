var codingFeaturesToCheck = ["ancC", "capsid", "envelope", "non_structural_proteins",
                             "precursor_polyprotein", "structural_proteins",  "pr", "prM",
                             "2K", "M", "NS1", "NS2A", "NS2B", "NS3", "NS4A", "NS4B", "NS5" ];

var problematicRefs = {};

var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%'", "name", "sequence.length"]));
_.each(refSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {
	
		_.each(codingFeaturesToCheck, function(featureName) {

			glue.inMode("feature-location/"+featureName, function() {
				var aaRows = glue.tableToObjects(glue.command(["amino-acid"]));
				for(var i = 0; i < aaRows.length; i++) {
	
					var aa = aaRows[i].aminoAcid;
					if(i < aaRows.length-1 && aa == "*") {
						if( !(featureName == "PRE_C" && aaRows[i].codonLabel == "28") ) { // precore mutants are ok
							glue.log("WARNING", "Residue "+aaRows[i].codonLabel+" of feature "+featureName+" on reference "+refSeqObj.name+" should not be *");
							problematicRefs[refSeqObj.name] = "yes";
						}
					}
					if(i < aaRows.length-1 && aa == "X") {
						glue.log("WARNING", "Residue "+aaRows[i].codonLabel+" of feature "+featureName+" on reference "+refSeqObj.name+" should not be X");
						problematicRefs[refSeqObj.name] = "yes";
					}

				}
	
			});

		});
		
	});
});


glue.logInfo("Problematic reference sequences: ", _.keys(problematicRefs));

