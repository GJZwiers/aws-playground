import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { CfnApplication } from "aws-cdk-lib/aws-sam";
import { Construct } from "constructs";

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const denoRuntime = new CfnApplication(this, "DenoRuntime", {
      location: {
        applicationId:
          "arn:aws:serverlessrepo:us-east-1:390065572566:applications/deno",
        semanticVersion: "1.27.0",
      },
    });

    // Deno Layer
    const layer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      "denoRuntimeLayer",
      denoRuntime.getAtt("Outputs.LayerArn").toString(),
    );

    const fn = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.PROVIDED_AL2,
      code: lambda.Code.fromAsset("../src"),
      handler: "hello.handler",
      layers: [layer],
    });

    fn.role?.attachInlinePolicy(
      new iam.Policy(this, "allow-lambda-list-functions", {
        statements: [
          new iam.PolicyStatement({
            actions: ["lambda:ListFunctions"],
            resources: ["*"],
          }),
        ],
      }),
    );

    const fn2 = new lambda.Function(this, "DDBHandler", {
      runtime: lambda.Runtime.PROVIDED_AL2,
      code: lambda.Code.fromAsset("../src"),
      handler: "ddb.handler",
      layers: [layer],
      timeout: cdk.Duration.seconds(10)
    });
    fn2.role?.attachInlinePolicy(
      new iam.Policy(this, "allow-ddb-create-table", {
        statements: [
          new iam.PolicyStatement({
            actions: ["dynamodb:createTable"],
            resources: ["*"],
          }),
        ],
      }),
    );
  }
}
