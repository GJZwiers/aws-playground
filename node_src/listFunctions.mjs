import { LambdaClient, ListFunctionsCommand } from "@aws-sdk/client-lambda";
 
export async function handler(
  _event,
  _context,
) {
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
