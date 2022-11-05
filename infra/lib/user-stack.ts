import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class UserStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const policy = new iam.ManagedPolicy(this, "AdminPolicy");
    policy.addStatements(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "*"
      ],
      resources: [
        "*"
      ]
    }));

    const adminGroup = new iam.Group(this, "AdminGroup", {
      groupName: "playground-admins",
      managedPolicies: [
        policy
      ],
    });

    new iam.User(this, "GitHubActionsUser", {
      userName: "GitHubActionsUser",
      groups: [adminGroup],
    });
  }
}
