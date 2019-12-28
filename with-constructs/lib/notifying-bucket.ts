import core = require("@aws-cdk/core");
import s3 = require("@aws-cdk/aws-s3");
import s3Notifications = require("@aws-cdk/aws-s3-notifications");
import sqs = require("@aws-cdk/aws-sqs");
import lambda = require("@aws-cdk/aws-lambda");
import lambdaEventSource = require("@aws-cdk/aws-lambda-event-sources");

// Definition for bucket/queue/lambda
interface NotifyingBucketProps {
  bucket?: s3.Bucket;
  bucketSettings?: s3.BucketProps;

  queue?: sqs.Queue;
  queueSettings?: sqs.QueueProps;

  lambda?: lambda.Function;
  lambdaSettings?: lambda.FunctionProps;
}

// Construct for bucket that notifies lambda via SQS
export class NotifyingBucket extends core.Construct {
  constructor(
    scope: core.Construct,
    id: string,
    props: NotifyingBucketProps = {}
  ) {
    super(scope, id);

    const bucket = props.bucket || this.setBucket(props.bucketSettings);
    const queue = props.queue || this.setQueue(props.queueSettings);
    const lambdaHandler = props.lambda || this.setLambda(props.lambdaSettings);

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3Notifications.SqsDestination(queue),
      { suffix: ".txt" }
    );

    lambdaHandler.addEventSource(
      new lambdaEventSource.SqsEventSource(queue, {
        batchSize: 1
      })
    );
  }

  setBucket(props?: s3.BucketProps) {
    const bucket = new s3.Bucket(this, "Construct-Bucket", props);
    return bucket;
  }

  setQueue(props?: sqs.QueueProps) {
    const queue = new sqs.Queue(this, "Construct-Queue", props);
    return queue;
  }

  setLambda(props?: lambda.FunctionProps) {
    const combinedProperties = {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset("default"),
      handler: "default",
      timeout: core.Duration.seconds(60)
    };
    Object.assign(combinedProperties, props);

    const lambdaHandler = new lambda.Function(
      this,
      "Construct-HelloHandler",
      combinedProperties
    );
    return lambdaHandler;
  }
}
