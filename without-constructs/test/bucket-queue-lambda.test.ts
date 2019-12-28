import { expect, haveResource, ResourcePart } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import { BucketQueueLambdaStack } from '../lib/bucket-queue-lambda';

test('S3-SQS-Lambda Stack', () => {
    const app = new cdk.App();
    const stack = new BucketQueueLambdaStack(app, 'MyTestStack');

    expect(stack).to(haveResource("AWS::S3::Bucket", {
        BucketName: "simple-bucket"
    }));
    expect(stack).to(haveResource("AWS::SQS::Queue", {
        QueueName: "simple-bucket-queue"
    }));
    expect(stack).to(haveResource("AWS::Lambda::Function"));

});