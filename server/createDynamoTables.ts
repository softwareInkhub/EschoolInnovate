import { 
  CreateTableCommand, 
  DynamoDBClient, 
  ListTablesCommand,
  GlobalSecondaryIndex,
  ScalarAttributeType,
  AttributeDefinition,
  KeySchemaElement,
  KeyType,
  ProjectionType,
  CreateTableCommandInput
} from "@aws-sdk/client-dynamodb";

async function createDynamoTables() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  // Get existing tables to avoid recreating
  const { TableNames = [] } = await client.send(new ListTablesCommand({}));
  const tablesToCreate = [
    {
      name: "escool_users",
      schema: {
        TableName: "escool_users",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" } as KeySchemaElement],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "username", AttributeType: "S" } as AttributeDefinition
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "UsernameIndex",
            KeySchema: [{ AttributeName: "username", KeyType: "HASH" } as KeySchemaElement],
            Projection: { ProjectionType: "ALL" as ProjectionType },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_projects",
      schema: {
        TableName: "escool_projects",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" } as KeySchemaElement],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "featured", AttributeType: "S" } as AttributeDefinition, // Using S type for boolean
          { AttributeName: "createdBy", AttributeType: "N" } as AttributeDefinition
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "FeaturedIndex",
            KeySchema: [{ AttributeName: "featured", KeyType: "HASH" } as KeySchemaElement],
            Projection: { ProjectionType: "ALL" as ProjectionType },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          },
          {
            IndexName: "CreatedByIndex",
            KeySchema: [{ AttributeName: "createdBy", KeyType: "HASH" } as KeySchemaElement],
            Projection: { ProjectionType: "ALL" as ProjectionType },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_roles",
      schema: {
        TableName: "escool_roles",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" } as KeySchemaElement],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "projectId", AttributeType: "N" } as AttributeDefinition
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "ProjectIdIndex",
            KeySchema: [{ AttributeName: "projectId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_team_members",
      schema: {
        TableName: "escool_team_members",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" } as KeySchemaElement],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "projectId", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "userId", AttributeType: "N" } as AttributeDefinition
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "ProjectIdIndex",
            KeySchema: [{ AttributeName: "projectId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          },
          {
            IndexName: "UserIdIndex",
            KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_applications",
      schema: {
        TableName: "escool_applications",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" },
          { AttributeName: "projectId", AttributeType: "N" },
          { AttributeName: "userId", AttributeType: "N" }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "ProjectIdIndex",
            KeySchema: [{ AttributeName: "projectId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          },
          {
            IndexName: "UserIdIndex",
            KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_schools",
      schema: {
        TableName: "escool_schools",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "featured", AttributeType: "S" } as AttributeDefinition // Using S type for boolean
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "FeaturedIndex",
            KeySchema: [{ AttributeName: "featured", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_courses",
      schema: {
        TableName: "escool_courses",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" } as AttributeDefinition,
          { AttributeName: "featured", AttributeType: "S" } as AttributeDefinition, // Using S type for boolean
          { AttributeName: "schoolId", AttributeType: "N" } as AttributeDefinition
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "FeaturedIndex",
            KeySchema: [{ AttributeName: "featured", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          },
          {
            IndexName: "SchoolIdIndex",
            KeySchema: [{ AttributeName: "schoolId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_modules",
      schema: {
        TableName: "escool_modules",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" },
          { AttributeName: "courseId", AttributeType: "N" }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "CourseIdIndex",
            KeySchema: [{ AttributeName: "courseId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_lessons",
      schema: {
        TableName: "escool_lessons",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" },
          { AttributeName: "moduleId", AttributeType: "N" }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "ModuleIdIndex",
            KeySchema: [{ AttributeName: "moduleId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_instructors",
      schema: {
        TableName: "escool_instructors",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "N" },
          { AttributeName: "schoolId", AttributeType: "N" }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "SchoolIdIndex",
            KeySchema: [{ AttributeName: "schoolId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
  ];

  for (const table of tablesToCreate) {
    if (!TableNames.includes(table.name)) {
      console.log(`Creating table: ${table.name}`);
      try {
        await client.send(new CreateTableCommand(table.schema));
        console.log(`Table ${table.name} created successfully`);
      } catch (error) {
        console.error(`Error creating table ${table.name}:`, error);
        throw error;
      }
    } else {
      console.log(`Table ${table.name} already exists, skipping creation`);
    }
  }

  console.log("All tables created or verified successfully");
}

// If this file is run directly
if (require.main === module) {
  createDynamoTables()
    .then(() => console.log("DynamoDB tables setup complete"))
    .catch(err => console.error("Error setting up DynamoDB tables:", err));
}

export default createDynamoTables;