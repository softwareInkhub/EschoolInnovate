import {
  BatchWriteCommand,
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "./dynamo";
import { IStorage } from "./storage";
import {
  User, InsertUser,
  Project, InsertProject, 
  Role, InsertRole,
  TeamMember, InsertTeamMember,
  Application, InsertApplication,
  School, InsertSchool,
  Course, InsertCourse,
  Module, InsertModule,
  Lesson, InsertLesson,
  Instructor, InsertInstructor
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectDynamoDB from "connect-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const MemoryStore = createMemoryStore(session);
const DynamoDBStore = connectDynamoDB(session);

// DynamoDB table names
const TABLE_NAMES = {
  USERS: "escool_users",
  PROJECTS: "escool_projects",
  ROLES: "escool_roles",
  TEAM_MEMBERS: "escool_team_members",
  APPLICATIONS: "escool_applications",
  SCHOOLS: "escool_schools",
  COURSES: "escool_courses",
  MODULES: "escool_modules",
  LESSONS: "escool_lessons",
  INSTRUCTORS: "escool_instructors",
  SESSIONS: "escool_sessions" // Table for session storage
};

export class DynamoStorage implements IStorage {
  sessionStore: session.Store;

  // Flag to track if tables have been initialized
  private tablesInitialized = false;
  
  constructor() {
    // Create DynamoDB client config
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
      console.log("AWS credentials not found in environment. Using default credential provider chain for session store.");
    }

    // Use DynamoDB for session storage
    this.sessionStore = new DynamoDBStore({
      // AWS SDK v3 client
      client: new DynamoDB(clientConfig),
      table: TABLE_NAMES.SESSIONS,
      hashKey: 'id', // The primary key attribute name
      readCapacityUnits: 5,
      writeCapacityUnits: 5
    });
    
    // We'll initialize tables when needed in async methods
    // since constructor can't be async
  }

  private async initializeTables() {
    // Only initialize tables once per instance
    if (this.tablesInitialized) {
      return;
    }

    // Import and call the table creation function
    const createDynamoTables = (await import('./createDynamoTables')).default;
    try {
      await createDynamoTables();
      console.log('DynamoDB tables initialized successfully');
      this.tablesInitialized = true;
    } catch (error) {
      console.error('Error initializing DynamoDB tables:', error);
      // Don't throw here to allow the application to start even if tables exist
      this.tablesInitialized = true; // Still mark as initialized to prevent repeated attempts
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.USERS,
        Key: { id },
      })
    );
    
    return result.Item as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.USERS,
        IndexName: "UsernameIndex",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
      })
    );
    
    if (!result.Items || result.Items.length === 0) {
      return undefined;
    }
    
    return result.Items[0] as User;
  }

  async createUser(user: InsertUser): Promise<User> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    // Generate a unique ID for the user
    const id = Date.now(); // Simple ID generation for demo
    const nowISO = new Date().toISOString(); // Store dates as ISO strings for DynamoDB
    
    const newUser: User = {
      ...user,
      id,
      createdAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      avatar: user.avatar || null,
      bio: user.bio || null
    };
    
    // Set up MarshallOptions to handle Date objects
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.USERS,
        Item: newUser,
        // DynamoDB doesn't directly support JS Date objects
      })
    );
    
    return newUser;
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.PROJECTS,
        Key: { id },
      })
    );
    
    return result.Item as Project | undefined;
  }

  async getProjects(filters: Partial<Project> = {}): Promise<Project[]> {
    // Build filter expression based on provided filters
    let filterExpression = "";
    const expressionAttributeValues: Record<string, any> = {};
    const attributeNames: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, value], index) => {
      if (value !== undefined) {
        const placeholder = `:v${index}`;
        const attrName = `#a${index}`;
        
        filterExpression += filterExpression ? ` AND ${attrName} = ${placeholder}` : `${attrName} = ${placeholder}`;
        expressionAttributeValues[placeholder] = value;
        attributeNames[attrName] = key;
      }
    });
    
    const scanParams: any = {
      TableName: TABLE_NAMES.PROJECTS
    };
    
    if (filterExpression) {
      scanParams.FilterExpression = filterExpression;
      scanParams.ExpressionAttributeValues = expressionAttributeValues;
      scanParams.ExpressionAttributeNames = attributeNames;
    }
    
    const result = await docClient.send(new ScanCommand(scanParams));
    
    return (result.Items || []) as Project[];
  }

  async getFeaturedProjects(): Promise<Project[]> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    try {
      // First attempt to use the GSI with featured attribute
      const result = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAMES.PROJECTS,
          IndexName: "FeaturedIndex",
          KeyConditionExpression: "featured = :featured",
          ExpressionAttributeValues: {
            ":featured": "true", // In DynamoDB we're using string "true"/"false" for GSI
          },
        })
      );
      
      return (result.Items || []) as Project[];
    } catch (error) {
      console.error("Error querying featured projects with GSI:", error);
      
      // Fallback: use scan with filter for isFeatured
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAMES.PROJECTS,
          FilterExpression: "isFeatured = :isFeatured",
          ExpressionAttributeValues: {
            ":isFeatured": true
          },
        })
      );
      
      return (result.Items || []) as Project[];
    }
  }

  async createProject(project: InsertProject): Promise<Project> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const id = Date.now();
    const nowISO = new Date().toISOString(); // Store dates as ISO strings for DynamoDB
    
    const newProject: Project = {
      ...project,
      id,
      createdAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      isFeatured: false, // Default value using the correct property name
      banner: project.banner || null,
      website: project.website || null,
      problem: project.problem || null,
      market: project.market || null,
      competition: project.competition || null
    };
    
    // Store featured as 'true' or 'false' string in DynamoDB for the GSI
    const dynamoProject = {
      ...newProject,
      featured: 'false' // For the GSI index in DynamoDB
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.PROJECTS,
        Item: dynamoProject,
      })
    );
    
    return newProject;
  }

  async updateProject(id: number, projectUpdate: Partial<Project>): Promise<Project | undefined> {
    // First, check if the project exists
    const project = await this.getProject(id);
    if (!project) {
      return undefined;
    }
    
    // Build update expression
    let updateExpression = "SET";
    const expressionAttributeValues: Record<string, any> = {};
    const attributeNames: Record<string, string> = {};
    
    Object.entries(projectUpdate).forEach(([key, value], index) => {
      if (value !== undefined && key !== "id") { // Don't update the ID
        const placeholder = `:v${index}`;
        const attrName = `#a${index}`;
        
        updateExpression += ` ${attrName} = ${placeholder},`;
        expressionAttributeValues[placeholder] = value;
        attributeNames[attrName] = key;
      }
    });
    
    // Remove trailing comma
    updateExpression = updateExpression.slice(0, -1);
    
    if (Object.keys(expressionAttributeValues).length === 0) {
      // Nothing to update
      return project;
    }
    
    const result = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAMES.PROJECTS,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: attributeNames,
        ReturnValues: "ALL_NEW",
      })
    );
    
    return result.Attributes as Project;
  }

  async deleteProject(id: number): Promise<boolean> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAMES.PROJECTS,
        Key: { id },
      })
    );
    
    // We'll assume success if no error is thrown
    return true;
  }

  // Role operations
  async getRoles(projectId: number): Promise<Role[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.ROLES,
        IndexName: "ProjectIdIndex",
        KeyConditionExpression: "projectId = :projectId",
        ExpressionAttributeValues: {
          ":projectId": projectId,
        },
      })
    );
    
    return (result.Items || []) as Role[];
  }

  async createRole(role: InsertRole): Promise<Role> {
    const id = Date.now();
    
    const newRole: Role = {
      ...role,
      id,
      description: role.description || null,
      isOpen: role.isOpen ?? true
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.ROLES,
        Item: newRole,
      })
    );
    
    return newRole;
  }

  async updateRole(id: number, roleUpdate: Partial<Role>): Promise<Role | undefined> {
    // First, check if the role exists
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.ROLES,
        Key: { id },
      })
    );
    
    const role = result.Item as Role | undefined;
    if (!role) {
      return undefined;
    }
    
    // Build update expression
    let updateExpression = "SET";
    const expressionAttributeValues: Record<string, any> = {};
    const attributeNames: Record<string, string> = {};
    
    Object.entries(roleUpdate).forEach(([key, value], index) => {
      if (value !== undefined && key !== "id") { // Don't update the ID
        const placeholder = `:v${index}`;
        const attrName = `#a${index}`;
        
        updateExpression += ` ${attrName} = ${placeholder},`;
        expressionAttributeValues[placeholder] = value;
        attributeNames[attrName] = key;
      }
    });
    
    // Remove trailing comma
    updateExpression = updateExpression.slice(0, -1);
    
    if (Object.keys(expressionAttributeValues).length === 0) {
      // Nothing to update
      return role;
    }
    
    const updateResult = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAMES.ROLES,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: attributeNames,
        ReturnValues: "ALL_NEW",
      })
    );
    
    return updateResult.Attributes as Role;
  }

  async deleteRole(id: number): Promise<boolean> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAMES.ROLES,
        Key: { id },
      })
    );
    
    // We'll assume success if no error is thrown
    return true;
  }

  // Team member operations
  async getTeamMembers(projectId: number): Promise<TeamMember[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.TEAM_MEMBERS,
        IndexName: "ProjectIdIndex",
        KeyConditionExpression: "projectId = :projectId",
        ExpressionAttributeValues: {
          ":projectId": projectId,
        },
      })
    );
    
    return (result.Items || []) as TeamMember[];
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.TEAM_MEMBERS,
        Key: { id },
      })
    );
    
    return result.Item as TeamMember | undefined;
  }

  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const id = Date.now();
    const nowISO = new Date().toISOString(); // Store dates as ISO strings for DynamoDB
    
    const newTeamMember: TeamMember = {
      ...teamMember,
      id,
      joinedAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      roleId: teamMember.roleId || null,
      isFounder: teamMember.isFounder ?? false
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.TEAM_MEMBERS,
        Item: newTeamMember,
      })
    );
    
    return newTeamMember;
  }

  async removeTeamMember(id: number): Promise<boolean> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAMES.TEAM_MEMBERS,
        Key: { id },
      })
    );
    
    // We'll assume success if no error is thrown
    return true;
  }

  // Application operations
  async getApplications(projectId: number): Promise<Application[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.APPLICATIONS,
        IndexName: "ProjectIdIndex",
        KeyConditionExpression: "projectId = :projectId",
        ExpressionAttributeValues: {
          ":projectId": projectId,
        },
      })
    );
    
    return (result.Items || []) as Application[];
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.APPLICATIONS,
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
    );
    
    return (result.Items || []) as Application[];
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const id = Date.now();
    const nowISO = new Date().toISOString(); // Store dates as ISO strings for DynamoDB
    
    const newApplication: Application = {
      ...application,
      id,
      createdAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      status: "pending", // Default
      message: application.message || null
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.APPLICATIONS,
        Item: newApplication,
      })
    );
    
    return newApplication;
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    // First, check if the application exists
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.APPLICATIONS,
        Key: { id },
      })
    );
    
    const application = result.Item as Application | undefined;
    if (!application) {
      return undefined;
    }
    
    const updateResult = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAMES.APPLICATIONS,
        Key: { id },
        UpdateExpression: "SET #status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": status },
        ReturnValues: "ALL_NEW",
      })
    );
    
    return updateResult.Attributes as Application;
  }

  // School operations
  async getSchools(): Promise<School[]> {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAMES.SCHOOLS,
      })
    );
    
    return (result.Items || []) as School[];
  }

  async getFeaturedSchools(): Promise<School[]> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    try {
      // First attempt to use the GSI with featured attribute
      const result = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAMES.SCHOOLS,
          IndexName: "FeaturedIndex",
          KeyConditionExpression: "featured = :featured",
          ExpressionAttributeValues: {
            ":featured": "true", // In DynamoDB we're using string "true"/"false" for GSI
          },
        })
      );
      
      return (result.Items || []) as School[];
    } catch (error) {
      console.error("Error querying featured schools with GSI:", error);
      
      // Fallback: use scan with filter for isFeatured
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAMES.SCHOOLS,
          FilterExpression: "isFeatured = :isFeatured",
          ExpressionAttributeValues: {
            ":isFeatured": true
          },
        })
      );
      
      return (result.Items || []) as School[];
    }
  }

  async getSchool(id: number): Promise<School | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.SCHOOLS,
        Key: { id },
      })
    );
    
    return result.Item as School | undefined;
  }

  async createSchool(school: InsertSchool): Promise<School> {
    const id = Date.now();
    
    const newSchool: School = {
      ...school,
      id,
      banner: school.banner || null,
      image: school.image || null,
      logo: school.logo || null,
      established: school.established || null,
      location: school.location || null,
      featured: school.featured ?? false,
      courseCount: school.courseCount ?? 0,
      instructorsCount: school.instructorsCount ?? 0,
      studentsCount: school.studentsCount ?? 0,
      rating: school.rating ?? 0,
      categories: Array.isArray(school.categories) ? (school.categories as any[]).map(c => String(c)) : null,
      socialLinks: school.socialLinks ? { 
        website: school.socialLinks.website as string | undefined,
        twitter: school.socialLinks.twitter as string | undefined,
        linkedin: school.socialLinks.linkedin as string | undefined, 
        youtube: school.socialLinks.youtube as string | undefined
      } : null
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.SCHOOLS,
        Item: newSchool,
      })
    );
    
    return newSchool;
  }

  // Course operations
  async getCourses(filters: Partial<Course> = {}): Promise<Course[]> {
    // Build filter expression based on provided filters
    let filterExpression = "";
    const expressionAttributeValues: Record<string, any> = {};
    const attributeNames: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, value], index) => {
      if (value !== undefined) {
        const placeholder = `:v${index}`;
        const attrName = `#a${index}`;
        
        filterExpression += filterExpression ? ` AND ${attrName} = ${placeholder}` : `${attrName} = ${placeholder}`;
        expressionAttributeValues[placeholder] = value;
        attributeNames[attrName] = key;
      }
    });
    
    const scanParams: any = {
      TableName: TABLE_NAMES.COURSES
    };
    
    if (filterExpression) {
      scanParams.FilterExpression = filterExpression;
      scanParams.ExpressionAttributeValues = expressionAttributeValues;
      scanParams.ExpressionAttributeNames = attributeNames;
    }
    
    const result = await docClient.send(new ScanCommand(scanParams));
    
    return (result.Items || []) as Course[];
  }

  async getPopularCourses(limit: number = 10): Promise<Course[]> {
    // Sort by enrolled count or views
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAMES.COURSES,
        FilterExpression: "attribute_exists(enrolledCount)",
        Limit: limit,
      })
    );
    
    // Sort in-memory by enrolled count
    const courses = (result.Items || []) as Course[];
    return courses.sort((a, b) => 
      (b.enrolledCount || 0) - (a.enrolledCount || 0)
    ).slice(0, limit);
  }

  async getFeaturedCourses(limit: number = 10): Promise<Course[]> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    try {
      // First attempt to use the GSI with featured attribute
      const result = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAMES.COURSES,
          IndexName: "FeaturedIndex",
          KeyConditionExpression: "featured = :featured",
          ExpressionAttributeValues: {
            ":featured": "true", // In DynamoDB we're using string "true"/"false" for GSI
          },
          Limit: limit,
        })
      );
      
      return (result.Items || []).slice(0, limit) as Course[];
    } catch (error) {
      console.error("Error querying featured courses with GSI:", error);
      
      // Fallback: use scan with filter for featured
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAMES.COURSES,
          FilterExpression: "featured = :featured",
          ExpressionAttributeValues: {
            ":featured": true
          },
          Limit: limit,
        })
      );
      
      return (result.Items || []).slice(0, limit) as Course[];
    }
  }

  async getNewCourses(limit: number = 10): Promise<Course[]> {
    // Sort by creation date
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAMES.COURSES,
      })
    );
    
    // Sort in-memory by creation date
    const courses = (result.Items || []) as Course[];
    return courses
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, limit);
  }

  async getSchoolCourses(schoolId: number): Promise<Course[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.COURSES,
        IndexName: "SchoolIdIndex",
        KeyConditionExpression: "schoolId = :schoolId",
        ExpressionAttributeValues: {
          ":schoolId": schoolId,
        },
      })
    );
    
    return (result.Items || []) as Course[];
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.COURSES,
        Key: { id },
      })
    );
    
    return result.Item as Course | undefined;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    // Make sure tables are initialized before accessing
    await this.initializeTables();
    
    const id = Date.now();
    const nowISO = new Date().toISOString(); // Store dates as ISO strings for DynamoDB
    
    const newCourse: Course = {
      ...course,
      id,
      createdAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      updatedAt: nowISO as any, // Cast to any to avoid type issues with Date vs string
      banner: course.banner || null,
      thumbnail: course.thumbnail || null,
      introVideo: course.introVideo || null,
      tags: Array.isArray(course.tags) ? (course.tags as any[]).map(t => String(t)) : null,
      outcomes: Array.isArray(course.outcomes) ? (course.outcomes as any[]).map(o => String(o)) : null,
      requirements: Array.isArray(course.requirements) ? (course.requirements as any[]).map(r => String(r)) : null,
      rating: 0,
      ratingCount: 0,
      enrolledCount: 0,
      lessonsCount: 0,
      featured: course.featured ?? false,
      popular: course.popular ?? false,
      isNew: course.isNew ?? true,
      price: course.price || null,
      discountedPrice: course.discountedPrice || null,
      language: course.language || "English",
      certificate: course.certificate ?? false
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.COURSES,
        Item: newCourse,
      })
    );
    
    return newCourse;
  }

  // Module operations
  async getModules(courseId: number): Promise<Module[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.MODULES,
        IndexName: "CourseIdIndex",
        KeyConditionExpression: "courseId = :courseId",
        ExpressionAttributeValues: {
          ":courseId": courseId,
        },
      })
    );
    
    return (result.Items || []) as Module[];
  }

  async getModule(id: number): Promise<Module | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.MODULES,
        Key: { id },
      })
    );
    
    return result.Item as Module | undefined;
  }

  async createModule(module: InsertModule): Promise<Module> {
    const id = Date.now();
    
    const newModule: Module = {
      ...module,
      id,
      description: module.description || null
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.MODULES,
        Item: newModule,
      })
    );
    
    return newModule;
  }

  // Lesson operations
  async getLessons(moduleId: number): Promise<Lesson[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.LESSONS,
        IndexName: "ModuleIdIndex",
        KeyConditionExpression: "moduleId = :moduleId",
        ExpressionAttributeValues: {
          ":moduleId": moduleId,
        },
      })
    );
    
    return (result.Items || []) as Lesson[];
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.LESSONS,
        Key: { id },
      })
    );
    
    return result.Item as Lesson | undefined;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const id = Date.now();
    
    const newLesson: Lesson = {
      ...lesson,
      id,
      description: lesson.description || null,
      content: lesson.content || null,
      videoUrl: lesson.videoUrl || null,
      attachments: Array.isArray(lesson.attachments) ? 
        (lesson.attachments as any[]).map(attachment => {
          return { 
            name: String(attachment.name || ''), 
            url: String(attachment.url || ''), 
            type: String(attachment.type || '')
          };
        }) : null,
      preview: lesson.preview ?? false
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.LESSONS,
        Item: newLesson,
      })
    );
    
    return newLesson;
  }

  // Instructor operations
  async getInstructors(): Promise<Instructor[]> {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAMES.INSTRUCTORS,
      })
    );
    
    return (result.Items || []) as Instructor[];
  }

  async getSchoolInstructors(schoolId: number): Promise<Instructor[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAMES.INSTRUCTORS,
        IndexName: "SchoolIdIndex",
        KeyConditionExpression: "schoolId = :schoolId",
        ExpressionAttributeValues: {
          ":schoolId": schoolId,
        },
      })
    );
    
    return (result.Items || []) as Instructor[];
  }

  async getInstructor(id: number): Promise<Instructor | undefined> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAMES.INSTRUCTORS,
        Key: { id },
      })
    );
    
    return result.Item as Instructor | undefined;
  }

  async createInstructor(instructor: InsertInstructor): Promise<Instructor> {
    const id = Date.now();
    
    const newInstructor: Instructor = {
      ...instructor,
      id,
      avatar: instructor.avatar || null,
      bio: instructor.bio || null,
      userId: instructor.userId || null,
      schoolId: instructor.schoolId || null, 
      coursesCount: 0,
      studentsCount: 0,
      rating: 0,
      socialLinks: instructor.socialLinks ? {
        website: typeof instructor.socialLinks.website === 'string' ? instructor.socialLinks.website : undefined,
        twitter: typeof instructor.socialLinks.twitter === 'string' ? instructor.socialLinks.twitter : undefined,
        linkedin: typeof instructor.socialLinks.linkedin === 'string' ? instructor.socialLinks.linkedin : undefined,
        youtube: typeof instructor.socialLinks.youtube === 'string' ? instructor.socialLinks.youtube : undefined
      } : null
    };
    
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAMES.INSTRUCTORS,
        Item: newInstructor,
      })
    );
    
    return newInstructor;
  }
}

// Export a singleton instance for use throughout the application
export const dynamoStorage = new DynamoStorage();