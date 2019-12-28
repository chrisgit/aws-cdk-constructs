import core = require("@aws-cdk/core");
import s3 = require("@aws-cdk/aws-s3");
import s3Notifications = require("@aws-cdk/aws-s3-notifications");
import sqs = require("@aws-cdk/aws-sqs");
import iam = require("@aws-cdk/aws-iam");
import lambda = require("@aws-cdk/aws-lambda");
import lambdaEventSource = require("@aws-cdk/aws-lambda-event-sources");

export class BucketQueueLambdaStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "NotificationBucket", {
      versioned: true,
      bucketName: "simple-bucket",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    const queue = new sqs.Queue(this, "NotificationQueue", {
      queueName: "simple-bucket-queue",
      visibilityTimeout: core.Duration.seconds(660)
    });

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3Notifications.SqsDestination(queue),
      { suffix: ".txt" }
    );

    const lambdaHandler = new lambda.Function(this, "ShowMessageHandler", {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset("lambda"),
      handler: "showmessage.handler",
      timeout: core.Duration.seconds(60)
    });

    // This is a hook into the Lambda
    lambdaHandler.addEventSource(
      new lambdaEventSource.SqsEventSource(queue, {
        batchSize: 1
      })
    );
  }
}
