import core = require("@aws-cdk/core");
import s3 = require("@aws-cdk/aws-s3");
import lambda = require("@aws-cdk/aws-lambda");
import { NotifyingBucket } from "./notifying-bucket";

export class BucketQueueLambdaStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const bucketProps = {
      versioned: true,
      bucketName: "simple-bucket",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    };

    const queueProps = {
      queueName: "simple-bucket-queue",
      visibilityTimeout: core.Duration.seconds(660)
    };

    const lambdaProps = {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset("lambda"),
      handler: "showmessage.handler",
      timeout: core.Duration.seconds(60)
    };

    new NotifyingBucket(this, "NotifyBucket", {
      bucketSettings: bucketProps,
      queueSettings: queueProps,
      lambdaSettings: lambdaProps
    });
  }
}
