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
  console.log("Existing tables:", TableNames);

  // Helper function to create AttributeDefinition
  const createAttrDef = (name: string, type: ScalarAttributeType): AttributeDefinition => ({
    AttributeName: name,
    AttributeType: type
  });

  // Helper function to create KeySchemaElement
  const createKeySchema = (name: string, keyType: KeyType): KeySchemaElement => ({
    AttributeName: name,
    KeyType: keyType
  });

  // Helper function to create standard GSI
  const createGSI = (
    name: string, 
    hashKey: string,
    projectionType: ProjectionType = "ALL"
  ): GlobalSecondaryIndex => ({
    IndexName: name,
    KeySchema: [createKeySchema(hashKey, "HASH")],
    Projection: { ProjectionType: projectionType },
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  });

  // Define tables to create with proper types
  const tablesToCreate: { name: string, schema: CreateTableCommandInput }[] = [
    {
      name: "escool_sessions",
      schema: {
        TableName: "escool_sessions",
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "S")
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    },
    {
      name: "escool_users",
      schema: {
        TableName: "escool_users",
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("username", "S")
        ],
        GlobalSecondaryIndexes: [
          createGSI("UsernameIndex", "username")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("featured", "S"), // Using S type for boolean
          createAttrDef("createdBy", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("FeaturedIndex", "featured"),
          createGSI("CreatedByIndex", "createdBy")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("projectId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("ProjectIdIndex", "projectId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("projectId", "N"),
          createAttrDef("userId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("ProjectIdIndex", "projectId"),
          createGSI("UserIdIndex", "userId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("projectId", "N"),
          createAttrDef("userId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("ProjectIdIndex", "projectId"),
          createGSI("UserIdIndex", "userId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("featured", "S") // Using S type for boolean
        ],
        GlobalSecondaryIndexes: [
          createGSI("FeaturedIndex", "featured")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("featured", "S"), // Using S type for boolean
          createAttrDef("schoolId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("FeaturedIndex", "featured"),
          createGSI("SchoolIdIndex", "schoolId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("courseId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("CourseIdIndex", "courseId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("moduleId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("ModuleIdIndex", "moduleId")
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
        KeySchema: [createKeySchema("id", "HASH")],
        AttributeDefinitions: [
          createAttrDef("id", "N"),
          createAttrDef("schoolId", "N")
        ],
        GlobalSecondaryIndexes: [
          createGSI("SchoolIdIndex", "schoolId")
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

// For ESM modules, we export the function directly
export default createDynamoTables;