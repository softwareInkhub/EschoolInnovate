import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Create a DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1', // Default to us-east-1 if not specified
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Create a DynamoDB Document client (provides a higher-level interface)
export const docClient = DynamoDBDocumentClient.from(client);