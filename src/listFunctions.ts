import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "https://deno.land/x/lambda@1.28.3/mod.ts";
import { ApiFactory } from "https://deno.land/x/aws_api@v0.7.0/client/mod.ts";
import { Lambda } from "https://deno.land/x/aws_api@v0.7.0/services/lambda/mod.ts";

const lambda = new ApiFactory({
  region: "eu-west-3",
}).makeNew(Lambda);

export async function handler(
  _event: APIGatewayProxyEventV2,
  _context: Context,
): Promise<APIGatewayProxyResultV2> {
  const funs = await lambda.listFunctions({
    MaxItems: 10,
  });
  console.log(funs);

  return {
    statusCode: 200,
    headers: { "content-type": "text/html;charset=utf8" },
    body: JSON.stringify(funs.Functions),
  };
}
