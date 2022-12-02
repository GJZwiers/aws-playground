import { LambdaClient, ListFunctionsCommand } from "@aws-sdk/client-lambda";

const client = new LambdaClient({ region: "eu-west-3" });
 
export async function handler(
  _event,
  _context,
) {
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
