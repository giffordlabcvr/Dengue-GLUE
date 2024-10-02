# Dengue-GLUE: Phylogenomic Analysis of Dengue Virus

<img align="right" width="280" height="280" src="md/dengue-glue-logo.png">

Welcome to the GitHub repository for **Dengue-GLUE**!

Dengue-GLUE is a sequence-oriented resource for comparative genomic analysis of dengue virus (DENV), developed using the **[GLUE](https://github.com/giffordlabcvr/gluetools)** software framework.

GLUE is an open, integrated software toolkit designed for storing and interpreting sequence data. It supports the creation of bespoke projects, incorporating essential data items for comparative genomic analysis, such as sequences, multiple sequence alignments, genome feature annotations, and other associated data.

Projects are loaded into the GLUE "engine," forming a relational database that represents the semantic relationships between data items. This foundation supports systematic comparative analyses and the development of sequence-based resources.

**Dengue-GLUE** contains DENV feature definitions, alignments, and reference sequences for all DENV serotypes and genotypes, as well as all major and minor lineages defined **[here](https://dengue-lineages.org)**.

This Dengue-GLUE base project can be extended with additional layers, openly available via GitHub. These include **[NCBI-Dengue-GLUE](https://github.com/giffordlabcvr/NCBI-Dengue-GLUE)**: which extends Dengue-GLUE through the incorporation of all DENV sequence data published in NCBI GenBank.

For more information please see the **[User Guide](https://github.com/giffordlabcvr/Dengue-GLUE/wiki)**

## Key Features

- **GLUE Framework Integration**: Built on the GLUE software framework, Dengue-GLUE offers an extensible platform for efficient, standardized, and reproducible computational genomic analysis of dengue virus.

- **Phylogenetic Structure**: Sequence data in Dengue-GLUE is organized in a phylogenetically-structured manner, allowing users to explore evolutionary relationships easily.

- **Rich Annotations**: Annotated reference sequences enable rigorous comparative genomic analysis related to conservation, adaptation, structural context, and genotype-to-phenotype associations.

- **Automated Genotyping**: Dengue-GLUE can perform automated genotyping of DENV sequences (including subgenomic sequences) following [recently proposed lineage nomenclature](https://dengue-lineages.org), via GLUE's [maximum likelihood clade assignment (MLCA) algorithm](https://doi.org/10.1186/s12859-018-2459-9).

- **Exploratory and operational**: The GLUE framework allows sequence-based resources to be used for exploratory work in a research setting, as well as operational work in a public or animal health setting.
- 

## Installation

Please see the **[User Guide](https://github.com/giffordlabcvr/Dengue-GLUE/wiki)**

## Usage

GLUE contains an interactive command line environment focused on the development and use of GLUE projects by bioinformaticians. This provides a range of productivity-oriented features such as automatic command completion, command history and interactive paging through tabular data. 

For detailed instructions on how to use Dengue-GLUE for your comparative genomic analysis, refer to the GLUE's [reference documentation](http://glue-tools.cvr.gla.ac.uk/).

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

