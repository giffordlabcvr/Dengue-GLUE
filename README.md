# Dengue-GLUE: Phylogenomic Analysis of Dengue Virus

## Overview

Dengue-GLUE is a sequence-oriented resource for comparative genomic analysis of dengue virus (DENV), developed using the [GLUE](https://github.com/giffordlabcvr/gluetools) software framework.

Dengue-GLUE also contains reference sequences for all DENV serotypes, genotypes, as well as all major and minor lineages defined **[here](https://dengue-lineages.org)**.

The Dengue-GLUE base project can be extended with additional layers, openly available via GitHub. These include **[NCBI-Dengue-GLUE](https://github.com/giffordlabcvr/NCBI-Dengue-GLUE)**: which extends Dengue-GLUE through the incorporation of all DENV sequence data published in NCBI GenBank.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Genotyping](#genotyping)
- [Mutation frequencies](#mutation-frequencies)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features

- **GLUE Framework Integration**: Built on the GLUE software framework, Dengue-GLUE offers an extensible platform for efficient, standardized, and reproducible computational genomic analysis of dengue virus.

- **Phylogenetic Structure**: Sequence data in Dengue-GLUE is organized in a phylogenetically-structured manner, allowing users to explore evolutionary relationships easily.

- **Rich Annotations**: Annotated reference sequences enable rigorous comparative genomic analysis related to conservation, adaptation, structural context, and genotype-to-phenotype associations.

- **Automated Genotyping**: Dengue-GLUE can perform automated genotyping of DENV sequences (including subgenomic sequences) following [recently proposed lineage nomenclature](https://dengue-lineages.org), via GLUE's [maximum likelihood clade assignment (MLCA) algorithm](https://doi.org/10.1186/s12859-018-2459-9). 


## Installation

If you have not done so already, install the GLUE software framework by following the [installation instructions](http://glue-tools.cvr.gla.ac.uk/#/installation) on the GLUE web site: 

Download the Dengue-GLUE repository, navigate into the top-level directory, and start the GLUE command line interpreter.

At the GLUE command prompt, run the 'buildDengueProject.glue' file as follows:

```
GLUE Version 1.1.107
Copyright (C) 2015-2020 The University of Glasgow
This program comes with ABSOLUTELY NO WARRANTY. This is free software, and you
are welcome to redistribute it under certain conditions. For details see
GNU Affero General Public License v3: http://www.gnu.org/licenses/

Mode path: /
GLUE> run file buildDengueProject.glue
```

This will build the base project, which contains a minimal set of feature definitions, clade categories, reference sequences, and alignments.

## Usage

GLUE contains an interactive command line environment focused on the development and use of GLUE projects by bioinformaticians. This provides a range of productivity-oriented features such as automatic command completion, command history and interactive paging through tabular data. 

For detailed instructions on how to use Dengue-GLUE for your comparative genomic analysis, refer to the GLUE's [reference documentation](http://glue-tools.cvr.gla.ac.uk/).

## Genotyping

To classify DENV1, DENV2, DENV3 or DENV4 sequences via maximum likelihood clade assignment (MLCA)-based genotyping, call the appropriate genotyping module as follows:

```
Mode path: /project/dengue
GLUE> module denv2MaxLikelihoodGenotyper genotype file -f path/to/sequences/denv2.fasta 
```

If you need to first determine the serotypes of your input sequences, use Dengue-GLUE's BLAST-based serotype recogniser module as shown:

```
Mode path: /project/dengue
GLUE> module dengueSerotypeRecogniser recognise file -i path/to/sequences/denv.fasta 
```

## Mutation frequencies

Dengue GLUE can provide a detailed frequency distribution of amino acids at a specific position within a DENV coding feature, based on the alignments contained with the project. This can enable insights into the variability and conservation of DENV proteins.

The following command in the GLUE console calculates the amino acid frequencies at a specific position within a feature of a dengue virus type 2 (DENV2) alignment:

```
Mode path: /project/dengue
GLUE> alignment AL_DENV_2 amino-acid frequency -c -r REF_MASTER_DENV2 -f envelope -l 52 52
```

This command produces results in a tabular output format like this:

```
+==========+=======+===========+============+====================+
| feature  | codon | aminoAcid | numMembers |     pctMembers     |
+==========+=======+===========+============+====================+
| envelope | 52    | E         | 4          | 1.3840830449826989 |
| envelope | 52    | H         | 89         | 30.79584775086505  |
| envelope | 52    | K         | 1          | 0.3460207612456747 |
| envelope | 52    | Q         | 190        | 65.7439446366782   |
| envelope | 52    | Y         | 5          | 1.7301038062283738 |
+==========+=======+===========+============+====================+
```

### Command Breakdown

**`alignment AL_DENV_2`**
Selects the alignment for dengue virus type 2 (DENV2).

**`amino-acid frequency`**
Instructs GLUE to calculate amino acid frequencies within the selected alignment.

**`-c`**
Calculates the frequencies recursively, including all sub-alignments of DENV2. In Dengue-GLUE, alignments are arranged hierarchically to reflect evolutionary relationships.

**`-r REF_MASTER_DENV2`**
Specifies the constraining reference sequence, `REF_MASTER_DENV2`, which defines the coordinate space and the wild type amino acid for comparison.

**`-f envelope`**
Indicates the coding feature within the reference sequence (envelope) where amino acid frequencies will be calculated.

**`-l 52 52`**
Specifies the location within the feature to be analyzed. Here, it focuses on a single amino acid position (52).

### Interpretation of the Output

- **feature**: The coding feature analyzed (in this case, envelope).
- **codon**: The codon position within the feature (position 52).
- **aminoAcid**: The amino acid found at the specified codon position.
- **numMembers**: The number of sequences in the alignment containing the specified amino acid at the given position.
- **pctMembers**: The percentage of sequences in the alignment containing the specified amino acid at the given position.


## Data Sources

Dengue-GLUE relies on the following data sources:

- [NCBI Nucleotide](https://www.ncbi.nlm.nih.gov/nuccore)
- [GISAID](https://gisaid.org/)


## Contributing

We welcome contributions from the community! If you're interested in contributing to Dengue-GLUE, please review our [Contribution Guidelines](./md/CONTRIBUTING.md).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./md/code_of_conduct.md)


## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Contact

For questions, issues, or feedback, please open an issue on the [GitHub repository](https://github.com/giffordlabcvr/Dengue-GLUE/issues).

