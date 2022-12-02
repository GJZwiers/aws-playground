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

    const lambdaPolicyStatement = new iam.PolicyStatement({
      actions: ['lambda:ListFunctions'],
      resources: ['arn:aws:lambda:::*'],
    });

    const lambdaPolicy = new iam.Policy(
      this, 
      'list-functions-policy',
      {
        statements: [lambdaPolicyStatement],
      }
    );
    fn.role?.attachInlinePolicy(lambdaPolicy);

    const fn2 = new lambda.DockerImageFunction(this, "DockerHandlerNode", {
      code: lambda.DockerImageCode.fromImageAsset("../node_src"),
    });
    fn2.role?.attachInlinePolicy(lambdaPolicy);

  }
}
