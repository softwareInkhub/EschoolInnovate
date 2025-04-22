import { IStorage } from './storage';
import { MemStorage } from './storage';
import { DynamoStorage } from './dynamoStorage';

// Default connection states
let isDynamoAvailable = true;
let storageInstance: IStorage;

/**
 * Factory function to get the appropriate storage implementation
 * Will attempt to use DynamoDB first, and fallback to MemStorage if there's an issue
 */
export async function getStorage(): Promise<IStorage> {
  // Return the existing instance if we've already determined which one to use
  if (storageInstance) {
    return storageInstance;
  }

  try {
    // First, check if AWS credentials are available
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.log('AWS credentials not found in environment variables, using in-memory storage');
      isDynamoAvailable = false;
      storageInstance = new MemStorage();
      return storageInstance;
    }

    // Try to initialize DynamoDB storage
    storageInstance = new DynamoStorage();
    
    // Test the connection by attempting a simple operation
    await testDynamoConnection();
    
    console.log('Successfully connected to DynamoDB');
    return storageInstance;
  } catch (error) {
    console.error('Error connecting to DynamoDB:', error);
    console.log('Falling back to in-memory storage');
    
    // Set flag for future reference
    isDynamoAvailable = false;
    
    // Initialize and return MemStorage
    storageInstance = new MemStorage();
    return storageInstance;
  }
}

/**
 * Test DynamoDB connection by attempting to list tables
 */
async function testDynamoConnection() {
  try {
    // Import dynamoDB client
    const { docClient } = await import('./dynamo');
    
    // DynamoDB will throw an error here if credentials are invalid
    // We're not doing anything with the result, just testing the connection
    // Use a proper ListTablesCommand to test the connection
    const { ListTablesCommand } = await import('@aws-sdk/client-dynamodb');
    await docClient.send(new ListTablesCommand({}));
    
    return true;
  } catch (error) {
    console.error('DynamoDB connection test failed:', error);
    throw error;
  }
}

/**
 * Check if DynamoDB is available
 */
export function isDynamoDBAvailable(): boolean {
  return isDynamoAvailable;
}