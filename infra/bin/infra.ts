#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaStack } from "../lib/lambda-stack";
import { UserStack } from "../lib/user-stack";

const app = new cdk.App();

const account = "305747223196";
const region = "eu-west-3";

new UserStack(app, "UserStack", {
  env: { account, region },
});

new LambdaStack(app, "LambdaStack", {
  env: { account, region },
});
