import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "https://deno.land/x/lambda@1.27.0/mod.ts";
import { LambdaClient, ListFunctionsCommand } from "npm:@aws-sdk/client-lambda";
 
export async function handler(
  _event: APIGatewayProxyEventV2,
  _context: Context,
): Promise<APIGatewayProxyResultV2> {

  const client = new LambdaClient({ region: "eu-west-3" });

  const funs = await client.send(new ListFunctionsCommand({
    MaxItems: 10,
  }));
  console.log(funs);

  return {
    statusCode: 200,
    headers: { "content-type": "text/html;charset=utf8" },
    body: JSON.stringify(funs.Functions),
  };
}
