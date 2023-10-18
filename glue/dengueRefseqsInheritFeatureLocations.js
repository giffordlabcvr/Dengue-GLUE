glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name not like '%MASTER%'"]);

var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%'", "name", "sequence.length"]));
_.each(refSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {
	
		glue.command(["add", "feature-location", "whole_genome"]);
		glue.inMode("feature-location/whole_genome", function() {
			glue.command(["add", "segment", 1, refSeqObj["sequence.length"]]);
		});
		
	});
});


var genotype1RefSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%' and sequence.genotype like '1%'", "name"]));

_.each(genotype1RefSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {
	
		glue.command(["inherit", "feature-location", 
			"--recursive", "--spanGaps", 
			"AL_UNC_DENV1", "--relRefName", "REF_MASTER_DENV1", "whole_genome"]);		
	});
});

var genotype2RefSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%' and sequence.genotype like '2%'", "name"]));

_.each(genotype2RefSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {
	
		glue.command(["inherit", "feature-location", 
			"--recursive", "--spanGaps", 
			"AL_UNC_DENV2", "--relRefName", "REF_MASTER_DENV2", "whole_genome"]);		
	});
});


var genotype3RefSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%' and sequence.genotype like '3%'", "name"]));

_.each(genotype3RefSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {

		glue.command(["inherit", "feature-location", 
			"--recursive", "--spanGaps", 
			"AL_UNC_DENV3", "--relRefName", "REF_MASTER_DENV3", "whole_genome"]);		
	});
});

var genotype4RefSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "-w", "name not like '%MASTER%' and sequence.genotype like '4%'", "name"]));

_.each(genotype4RefSeqObjs, function(refSeqObj) {
	glue.inMode("reference/"+refSeqObj.name, function() {

		glue.command(["inherit", "feature-location", 
			"--recursive", "--spanGaps", 
			"AL_UNC_DENV4", "--relRefName", "REF_MASTER_DENV4", "whole_genome"]);		
	});
});

