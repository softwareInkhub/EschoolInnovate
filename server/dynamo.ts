import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Create a DynamoDB client with conditional configuration
let clientConfig: any = {
  region: process.env.AWS_REGION || 'us-east-1', // Default to us-east-1 if not specified
};

// Only add credentials if both AWS access keys are provided
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
} else {
  console.log("AWS credentials not found in environment. Using default credential provider chain.");
  // When no explicit credentials are provided, AWS SDK will use the default credential provider chain
  // This allows it to work with EC2 instance profiles, environment variables, or shared credential files
}

// Create a DynamoDB client
const client = new DynamoDBClient(clientConfig);

// Create a DynamoDB Document client (provides a higher-level interface)
export const docClient = DynamoDBDocumentClient.from(client);