# AWS Cloud Development Kit (CDK) without constructs
This sample project shows three resources being created
- S3 bucket with notification
- Queue
- Lambda

The code creates the resources inline; the resources can be passed to other stacks as constructor parameters.

# Installation
From this folder run `npm install`

After installation you can run the following commands
 - `npm run build`   compile typescript to js
 - `npm run watch`   watch for changes and compile
 - `npm run test`    run unit tests

To use the code for deployment
- `npx cdk ls`       to list stacks
- `npx cdk synth`    to emit the synthesized CloudFormation template
- `npx cdk deploy`   deploy this stack to your default AWS account/region
- `cdk diff`         compare deployed stack with current state

