# aws-cdk-constructs
A small example of using AWS Cloud Development Kit (CDK)

# Pre-Requisites
- A recent and preferable long term support (LTS) version of [Node](https://nodejs.org/en/download/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) in order to setup configuration information
- [npx](https://www.npmjs.com/package/npx) to run a project version of the CDK or global install of the [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

# Installation
For all subfolders you will need to install node modules with `npm install`

# Examples
## without-constucts
This example is a simple inline CDK script, more information inside the [README.md](without-constructs/README.md) of that folder.

## with-constructs
This example breaks out resources into a common component that can be re-used, these are the building blocks of CDK and called [constructs](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html). More information inside the [README.md](with-constructs/README.md) of that folder.
