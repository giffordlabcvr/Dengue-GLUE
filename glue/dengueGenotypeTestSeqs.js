//Do serotype recognition for all test sequences using set from Grubaugh lab

var yaleTestSet;
var whereClause = "source.name = 'yale-test-set' and genotype = null";

yaleTestSet = glue.tableToObjects(glue.command(["list", "sequence", "sequenceID", "serotype", "-w", whereClause]));
glue.log("INFO", "RESULT WAS ", yaleTestSet);

_.each(yaleTestSet, function(yaleTestSet) {

	var sequenceID = yaleTestSet.sequenceID;
	var sourceName ='yale-test-set';
	var serotype	= yaleTestSet.serotype;	
	glue.log("INFO", "ID RESULT WAS ", sequenceID);
	
	//glue.log("INFO", "WHERE CLAUSE RESULT WAS ", serotypeWhereClause);
	//glue.log("INFO", "sourceName RESULT WAS ", sourceName);
	//glue.log("INFO", "Serotype RESULT WAS ", serotype);

	var serotypeWhereClause = "sequenceID = '" + sequenceID + "'";
	var genotypeRow;
	
	if (serotype) {
	
		if (serotype == '1') {

			var genotypeResults1;
			glue.inMode("/module/denv1MaxLikelihoodGenotyper", function() {
				genotypeResults1 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
				glue.log("INFO", "Genotype 1 RESULT WAS ", genotypeResults1);			
			});

			var genotypeRows = genotypeResults1.genotypeCommandResult.row;
			genotypeRow = genotypeRows[0].value;

		}

		else if (serotype == '2') {

			var genotypeResults2;
			glue.inMode("/module/denv2MaxLikelihoodGenotyper", function() {
				genotypeResults2 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
			
				glue.log("INFO", "Genotype 2 RESULT WAS ", genotypeResults2);
			});

			var genotypeRows = genotypeResults2.genotypeCommandResult.row;
			genotypeRow = genotypeRows[0].value;
		
		}

		else if (serotype == '3') {

			var genotypeResults3;
			glue.inMode("/module/denv3MaxLikelihoodGenotyper", function() {
				genotypeResults3 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
				glue.log("INFO", "Genotype 3 RESULT WAS ", genotypeResults3);			
			});

			var genotypeRows = genotypeResults3.genotypeCommandResult.row;
			genotypeRow = genotypeRows[0].value;


		}
		else if (serotype == '4') {

			var genotypeResults4;
			glue.inMode("/module/denv4MaxLikelihoodGenotyper", function() {
				genotypeResults4 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
				glue.log("INFO", "Genotype 4 RESULT WAS ", genotypeResults4);
			});
  
			var genotypeRows = genotypeResults4.genotypeCommandResult.row;
			genotypeRow = genotypeRows[0].value;

		}
	
		var genotypeResult = genotypeRow[2]
		var majorLineageResult = genotypeRow[3]
		var minorLineageResult = genotypeRow[4]
		var minorSublineageResult = genotypeRow[5]
	
		if (genotypeResult) {
	
		    var genotype = genotypeResult.replace("AL_DENV_", "");			
			glue.log("INFO", "Genotype result: ", genotype);
			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "genotype", genotype]);
			});
		}
	
		if (majorLineageResult) {

		    var majorLineage = majorLineageResult.replace("AL_DENV_", "");			
			glue.log("INFO", "Major lineage result: ", majorLineage);			
			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "major_lineage", majorLineage]);
			});
		}
		if (minorLineageResult) {
		
		    var minorLineage = minorLineageResult.replace("AL_DENV_", "");			
			glue.log("INFO", "Minor lineage result: ", minorLineage);			
			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "minor_lineage", minorLineage]);
			});			
		}
		if (minorSublineageResult) {
		
		    var minorSublineage = minorLineageResult.replace("AL_DENV_", "");			
			glue.log("INFO", "Minor sublineage RESULT WAS ", minorSublineage);			
			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "minor_sublineage", minorSublineage]);
			});			
		}

	}

});	

