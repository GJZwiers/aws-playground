import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "https://deno.land/x/lambda@1.27.0/mod.ts";
import * as dynamodb from "https://deno.land/x/aws_sdk@v3.32.0-1/client-dynamodb/mod.ts";

export async function handler(_event: APIGatewayProxyEventV2, _context: Context): Promise<APIGatewayProxyResultV2> {
  const client = new dynamodb.DynamoDB({ apiVersion: 'latest' });

  await client.createTable({
      TableName: 'deno-test',
      KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'rate', KeyType: 'RANGE' }
      ],
      AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'rate', AttributeType: 'N' }
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 3,
          WriteCapacityUnits: 3
      }
  });

  return {
      statusCode: 200,
      headers: { "content-type": "text/html;charset=utf8" },
      body: `Powered by deno ${Deno.version.deno} 🦕`,
  };
}
