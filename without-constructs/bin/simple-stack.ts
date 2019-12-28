#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { BucketQueueLambdaStack } from "../lib/bucket-queue-lambda";

const app = new cdk.App();
new BucketQueueLambdaStack(app, "WithoutConstucts");
