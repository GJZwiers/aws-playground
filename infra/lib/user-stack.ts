import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class UserStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const policy = new iam.ManagedPolicy(this, "AdminPolicy");
    policy.addStatements(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "*",
        ],
        resources: [
          "*",
        ],
      }),
    );

    const adminGroup = new iam.Group(this, "AdminGroup", {
      groupName: "playground-admins",
      managedPolicies: [
        policy,
      ],
    });

    const userGroup = new iam.Group(this, "UserGroup", {
      groupName: "playground-users",
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          "ViewOnlyAccess",
          "arn:aws:iam::aws:policy/job-function/ViewOnlyAccess",
        ),
      ],
    });

    new iam.User(this, "GitHubActionsUser", {
      userName: "GitHubActionsUser",
      groups: [adminGroup],
    });

    new iam.User(this, "Admin", {
      userName: "AdminUser",
      groups: [adminGroup],
    });

    new iam.User(this, "ZeroUser", {
      userName: "ZeroUser",
      groups: [userGroup],
    });
  }
}
