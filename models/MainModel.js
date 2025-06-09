import {
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

// Setup DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT, // Remove if using actual AWS
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "customer-table";

// CREATE
export const saveCustomer = async (customer) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: customer,
  });

  try {
    await ddbDocClient.send(command);
    return { message: "Customer saved successfully" };
  } catch (error) {
    console.error("Error saving customer:", error);
    throw error;
  }
};

// READ (Single Item)
export const getCustomer = async (uid) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { uid },
  });

  try {
    const { Item } = await ddbDocClient.send(command);
    return Item;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

// READ (All Items)
export const getAllCustomers = async () => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  try {
    const { Items } = await ddbDocClient.send(command);
    return Items;
  } catch (error) {
    console.error("Error scanning customers:", error);
    throw error;
  }
};

// UPDATE
export const updateCustomer = async (uid, updates) => {
  const updateExpressions = [];
  const expressionAttributeValues = {};

  for (const [key, value] of Object.entries(updates)) {
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  }

  const expressionAttributeNames = Object.fromEntries(
    Object.keys(updates).map((key) => [`#${key}`, key])
  );

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { uid },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  });

  try {
    const response = await ddbDocClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// DELETE
export const deleteCustomer = async (uid) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { uid },
  });

  try {
    await ddbDocClient.send(command);
    return { message: "Customer deleted successfully" };
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const getCustomerCode = async (customerCode) => {
  try {
    console.log("Querying GSI for customerCode:", customerCode);

    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "customerCode-index", // Ensure GSI name matches
      KeyConditionExpression: "customerCode = :code",
      ExpressionAttributeValues: {
        ":code": customerCode,
      },
    });

    const response = await ddbDocClient.send(command);
    console.log("DynamoDB response:", response);

    if (!response.Items || response.Items.length === 0) {
      console.warn(`No items found for customerCode: ${customerCode}`);
      return null; // Return null if no items found
    }

    return response.Items; // Return matching items
  } catch (error) {
    console.error("Error querying GSI for customerCode:", error);
    throw error;
  }
};

export const getCustomerByType = async (customer_type) => {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "customer_type-index",
      KeyConditionExpression: "customer_type = :type",
      ExpressionAttributeValues: {
        ":type": customer_type,
      },
    });
    const response = await ddbDocClient.send(command);
    return response.Items;
  } catch(error) {
    console.error("Error querying GSI for customer_type:", error);
    throw error;
  }
}