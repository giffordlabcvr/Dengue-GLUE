# Dengue-GLUE: Phylogenomic Analysis of Dengue Virus

## Overview

Dengue-GLUE is a sequence-oriented resource for comparative genomic analysis of dengue virus (DENV), developed using the [GLUE](https://github.com/giffordlabcvr/gluetools) software framework.

Dengue-GLUE also contains reference sequences for all DENV serotypes, genotypes, as well as all major and minor lineages defined **[here](dengue-lineages.org)**.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features

- **GLUE Framework Integration**: Built on the GLUE software framework, Dengue-GLUE offers an extensible platform for efficient, standardized, and reproducible computational genomic analysis of dengue virus.

- **Phylogenetic Structure**: Sequence data in Dengue-GLUE is organized in a phylogenetically-structured manner, allowing users to explore evolutionary relationships easily.

- **Rich Annotations**: Each sequence is annotated with gene features, enabling rigorous comparative genomic analysis related to conservation, adaptation, structural context, and genotype-to-phenotype associations.

- **Automated Genotyping**: Dengue-GLUE can perform automated genotyping of DENV sequences (including subgenomic sequences) using the using the recently proposed DENV classification system, and GLUE's [maximum likelihood clade assignment (MLCA) algorithm](https://doi.org/10.1186/s12859-018-2459-9). The updated classification system a standardized neutral descriptor of DENV diversity for identifying and tracking lineages of potential epidemiological and/or clinical importance. Further information about the lineage system can be found **[here](dengue-lineages.org)**.


## Installation

If you have not done so already, install the GLUE software framework by following the [installation instructions](http://glue-tools.cvr.gla.ac.uk/#/installation) on the GLUE web site: 

Download the Dengue-GLUE repository, navigate into the top-level directory, and start the GLUE command line interpreter, e.g.:

```
GLUE Version 1.1.107
Copyright (C) 2015-2020 The University of Glasgow
This program comes with ABSOLUTELY NO WARRANTY. This is free software, and you
are welcome to redistribute it under certain conditions. For details see
GNU Affero General Public License v3: http://www.gnu.org/licenses/

Mode path: /
GLUE>
```

At the GLUE command prompt, run the 'buildDengueProject.glue' file as follows:

`GLUE> run file buildDengueProject.glue`

This will build the base project, which contains a minimal set of feature definitions, clade categories, reference sequences, and alignments. 

## Usage

GLUE contains an interactive command line environment focused on the development and use of GLUE projects by bioinformaticians. This provides a range of productivity-oriented features such as automatic command completion, command history and interactive paging through tabular data. 

For detailed instructions on how to use Dengue-GLUE for your comparative genomic analysis, refer to the GLUE's [reference documentation](http://glue-tools.cvr.gla.ac.uk/).

## Genotyping

To classify DENV1, DENV2, DENV3 or DENV4 sequences via maximum likelihood clade assignment (MLCA)-based genotyping, call the appropriate genotyping module as follows:

```
Mode path: /project/dengue
GLUE> module denv2MaxLikelihoodGenotyper genotype file -f path/to/sequences/denv2_sequences.fasta 
```

If you need to first determine the serotypes of your input sequences, use Dengue-GLUE's BLAST-based serotype recogniser module as shown:

```
Mode path: /project/dengue
GLUE> module dengueSerotypeRecogniser recognise file -i path/to/sequences/denv_sequences.fasta 
```


## Data Sources

Dengue-GLUE relies on the following data sources:

- [NCBI Nucleotide](https://www.ncbi.nlm.nih.gov/nuccore)
- [GISAID](https://gisaid.org/)
- [NCBI Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy)


## Contributing

We welcome contributions from the community! If you're interested in contributing to Dengue-GLUE, please review our [Contribution Guidelines](./md/CONTRIBUTING.md).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./md/code_of_conduct.md)


## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Contact

For questions, issues, or feedback, please open an issue on the [GitHub repository](https://github.com/giffordlabcvr/Dengue-GLUE/issues).

