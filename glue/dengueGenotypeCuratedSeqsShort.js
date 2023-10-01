
//Do serotype recognition for all ncbi curated sequences
var ncbiCurated;
var whereClause = "source.name = 'ncbi-curated-short' and genotype = null";
ncbiCurated = glue.tableToObjects(glue.command(["list", "sequence", "sequenceID", "serotype", "-w", whereClause]));
glue.log("INFO", "RESULT WAS ", ncbiCurated);

_.each(ncbiCurated, function(ncbiCurated) {

	var sequenceID = ncbiCurated.sequenceID;
	var sourceName ='ncbi-curated-short';
	var serotype   = ncbiCurated.serotype;
	
	var serotypeWhereClause = "sequenceID = '" + sequenceID + "'";
	glue.log("INFO", "ID RESULT WAS ", sequenceID);
	//glue.log("INFO", "WHERE CLAUSE RESULT WAS ", serotypeWhereClause);
	//glue.log("INFO", "sourceName RESULT WAS ", sourceName);
	//glue.log("INFO", "Serotype RESULT WAS ", serotype);

   if (serotype == '1') {

		var genotypeResults1;
		glue.inMode("/module/denv1MaxLikelihoodGenotyper", function() {
 			genotypeResults1 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
			//glue.log("INFO", "Genotype 1 RESULT WAS ", genotypeResults1);			
		});

		var genotypeRows = genotypeResults1.genotypeCommandResult.row;
		var genotypeRow = genotypeRows[0].value;
		var serotypeResult = genotypeRow[1]
		var genotypeResult = genotypeRow[2]

		glue.log("INFO", "Genotype 1 RESULT WAS ", genotypeResult);

		if (genotypeResult) {

			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "genotype", genotypeResult]);
			});
		
		}

   }

   else if (serotype == '2') {

		var genotypeResults2;
		glue.inMode("/module/denv2MaxLikelihoodGenotyper", function() {
			genotypeResults2 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
			
			//glue.log("INFO", "Genotype 2 RESULT WAS ", genotypeResults2);
		});

		var genotypeRows = genotypeResults2.genotypeCommandResult.row;
		var genotypeRow = genotypeRows[0].value;
		var serotypeResult = genotypeRow[1]
		var genotypeResult = genotypeRow[2]

		glue.log("INFO", "Genotype 2 RESULT WAS ", genotypeResult);

		if (genotypeResult) {

			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "genotype", genotypeResult]);
			});
			
		}
	   
   }
   else if (serotype == '3') {

		var genotypeResults3;
		glue.inMode("/module/denv3MaxLikelihoodGenotyper", function() {
			genotypeResults3 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
			//glue.log("INFO", "Genotype 3 RESULT WAS ", genotypeResults3);			
		});

		var genotypeRows = genotypeResults3.genotypeCommandResult.row;
		var genotypeRow = genotypeRows[0].value;
		var serotypeResult = genotypeRow[1]
		var genotypeResult = genotypeRow[2]

		glue.log("INFO", "Genotype 3 RESULT WAS ", genotypeResult);

		if (genotypeResult) {

			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "genotype", genotypeResult]);
			});
				
		}
	   
   }
   else if (serotype == '4') {

		var genotypeResults4;
		glue.inMode("/module/denv4MaxLikelihoodGenotyper", function() {
			genotypeResults4 = glue.command(["genotype", "sequence", "-w", serotypeWhereClause]);
			//glue.log("INFO", "Genotype 4 RESULT WAS ", genotypeResults4);
		});
  
  		var genotypeRows = genotypeResults4.genotypeCommandResult.row;
		var genotypeRow = genotypeRows[0].value;
		var serotypeResult = genotypeRow[1]
		var genotypeResult = genotypeRow[2]

		glue.log("INFO", "Genotype 4 RESULT WAS ", genotypeResult);
		
		if (genotypeResult) {

			glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {
				glue.command(["set", "field", "genotype", genotypeResult]);
			});
		
		
		}
 
   }	

});	
