import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.DockerImageFunction(this, "DockerHandler", {
      code: lambda.DockerImageCode.fromImageAsset("../src"),
    });

    const policy = new iam.Policy(this, "allow-lambda-list-functions", {
      statements: [
        new iam.PolicyStatement({
          actions: ["lambda:ListFunctions"],
          resources: ["*"],
        }),
      ],
    });
    fn.role?.attachInlinePolicy(policy);

    const fn2 = new lambda.DockerImageFunction(this, "DockerHandlerNode", {
      code: lambda.DockerImageCode.fromImageAsset("../node_src"),
    });
    fn2.role?.attachInlinePolicy(policy);
  }
}
