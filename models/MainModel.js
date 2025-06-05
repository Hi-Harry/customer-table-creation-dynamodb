import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

// Create the DynamoDB Client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT, // For local DynamoDB; omit this if using AWS hosted
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create DocumentClient for easier JSON-like operations
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "customer-table";

export const saveCustomer = async (customer) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: customer,
  });

  try {
    await ddbDocClient.send(command);
  } catch (error) {
    console.error("Error saving customer to DynamoDB:", error);
    throw error;
  }
};
