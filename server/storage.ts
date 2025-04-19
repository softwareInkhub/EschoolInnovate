import { 
  User, InsertUser, Project, InsertProject, Role, InsertRole, 
  TeamMember, InsertTeamMember, Application, InsertApplication,
  School, InsertSchool
} from "@shared/schema";

// Storage interface with CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjects(filters?: Partial<Project>): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Role operations
  getRoles(projectId: number): Promise<Role[]>;
  createRole(role: InsertRole): Promise<Role>;
  updateRole(id: number, role: Partial<Role>): Promise<Role | undefined>;
  deleteRole(id: number): Promise<boolean>;
  
  // Team member operations
  getTeamMembers(projectId: number): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  removeTeamMember(id: number): Promise<boolean>;
  
  // Application operations
  getApplications(projectId: number): Promise<Application[]>;
  getUserApplications(userId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;
  
  // School operations
  getSchools(): Promise<School[]>;
  getSchool(id: number): Promise<School | undefined>;
  createSchool(school: InsertSchool): Promise<School>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private roles: Map<number, Role>;
  private teamMembers: Map<number, TeamMember>;
  private applications: Map<number, Application>;
  private schools: Map<number, School>;
  
  private currentUserId: number;
  private currentProjectId: number;
  private currentRoleId: number;
  private currentTeamMemberId: number;
  private currentApplicationId: number;
  private currentSchoolId: number;
  
  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.roles = new Map();
    this.teamMembers = new Map();
    this.applications = new Map();
    this.schools = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentRoleId = 1;
    this.currentTeamMemberId = 1;
    this.currentApplicationId = 1;
    this.currentSchoolId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Create sample users
    const user1 = this.createUser({
      username: "johndoe",
      password: "password123",
      email: "john@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Full-stack developer interested in EdTech"
    });
    
    const user2 = this.createUser({
      username: "janedoe",
      password: "password123",
      email: "jane@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "UX Designer with passion for educational products"
    });
    
    // Create sample schools
    this.createSchool({
      name: "Tech School",
      description: "Learn cutting-edge technologies and development practices",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      category: "Software Engineering",
      courseCount: 4
    });
    
    this.createSchool({
      name: "Business School",
      description: "Master business fundamentals and startup strategies",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      category: "Entrepreneurship",
      courseCount: 6
    });
    
    this.createSchool({
      name: "Data Science School",
      description: "Learn to build intelligent systems and analyze data",
      image: "https://images.unsplash.com/photo-1581094794329-c8112c4133a5",
      category: "AI & Machine Learning",
      courseCount: 5
    });
    
    this.createSchool({
      name: "Design School",
      description: "Master the principles of user-centered design",
      image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
      category: "UX/UI & Product Design",
      courseCount: 3
    });
    
    // Create sample projects
    const project1 = this.createProject({
      name: "AI Education Assistant",
      description: "An AI-powered platform that helps students master complex subjects through personalized learning paths and interactive content.",
      banner: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
      category: "EdTech",
      stage: "Building MVP",
      teamSize: 2,
      maxTeamSize: 4,
      website: "https://aieduassistant.com",
      problem: "Students struggle with traditional one-size-fits-all learning approaches.",
      market: "The global e-learning market was valued at $250 billion in 2020 and is expected to reach $1 trillion by 2027.",
      competition: "Khan Academy, Coursera, Duolingo",
      isFeatured: true,
      createdBy: user1.id
    });
    
    const project2 = this.createProject({
      name: "EdTech Analytics Platform",
      description: "A comprehensive analytics tool for educational institutions to track student performance and improve teaching methods.",
      banner: "https://images.unsplash.com/photo-1551135049-8a33b5883817",
      category: "Analytics",
      stage: "Idea Stage",
      teamSize: 1,
      maxTeamSize: 3,
      website: "",
      problem: "Educational institutions lack insights into student performance and learning patterns.",
      market: "The education analytics market is expected to grow at a CAGR of 17.4% from 2021 to 2028.",
      competition: "Blackboard Analytics, PowerSchool",
      isFeatured: true,
      createdBy: user2.id
    });
    
    const project3 = this.createProject({
      name: "Virtual Learning Environment",
      description: "An immersive VR-based platform that creates interactive learning experiences for students of all ages.",
      banner: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e",
      category: "VR/AR",
      stage: "Idea Stage",
      teamSize: 3,
      maxTeamSize: 6,
      website: "https://vrlearn.tech",
      problem: "Traditional learning environments lack engagement and immersion.",
      market: "The VR in education market is projected to reach $13 billion by 2026.",
      competition: "ClassVR, Engage VR",
      isFeatured: true,
      createdBy: user1.id
    });
    
    const project4 = this.createProject({
      name: "Course Management System",
      description: "A comprehensive platform for educational institutions to manage courses, students, and resources.",
      banner: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      category: "Tech",
      stage: "Active Project",
      teamSize: 4,
      maxTeamSize: 6,
      website: "https://coursemgr.io",
      problem: "Educational institutions struggle with outdated administrative systems.",
      market: "The education management software market is expected to grow to $22.18 billion by 2026.",
      competition: "Canvas, Moodle, Blackboard",
      isFeatured: false,
      createdBy: user1.id
    });
    
    const project5 = this.createProject({
      name: "AI Tutoring Platform",
      description: "Personalized AI tutoring service that adapts to each student's learning style and pace.",
      banner: "https://images.unsplash.com/photo-1497493292307-31c376b6e479",
      category: "EdTech",
      stage: "Looking for Co-founder",
      teamSize: 1,
      maxTeamSize: 4,
      website: "https://ai-tutor.edu",
      problem: "Traditional tutoring is expensive and not accessible to all students.",
      market: "The global private tutoring market is projected to reach $279 billion by 2026.",
      competition: "Knewton, Carnegie Learning",
      isFeatured: false,
      createdBy: user2.id
    });
    
    const project6 = this.createProject({
      name: "Educational Metaverse",
      description: "An immersive virtual reality platform for collaborative learning and educational experiences.",
      banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      category: "VR/AR",
      stage: "New Project",
      teamSize: 2,
      maxTeamSize: 8,
      website: "https://eduverse.world",
      problem: "Distance learning lacks the social and immersive aspects of in-person education.",
      market: "The metaverse in education market is expected to grow at a CAGR of 39.8% from 2022 to 2030.",
      competition: "Roblox Education, Meta Horizon Worlds",
      isFeatured: false,
      createdBy: user1.id
    });
    
    // Create sample roles
    this.createRole({
      projectId: project1.id,
      title: "Frontend Developer",
      description: "Develop and maintain the user interface using React",
      isOpen: true
    });
    
    this.createRole({
      projectId: project1.id,
      title: "UX Designer",
      description: "Design user interfaces and user experiences",
      isOpen: true
    });
    
    this.createRole({
      projectId: project2.id,
      title: "Data Scientist",
      description: "Build machine learning models for educational data",
      isOpen: true
    });
    
    this.createRole({
      projectId: project3.id,
      title: "Unity Developer",
      description: "Develop VR environments using Unity",
      isOpen: true
    });
    
    this.createRole({
      projectId: project3.id,
      title: "3D Artist",
      description: "Create 3D models and environments",
      isOpen: true
    });
    
    this.createRole({
      projectId: project3.id,
      title: "Game Designer",
      description: "Design interactive learning games",
      isOpen: true
    });
    
    this.createRole({
      projectId: project3.id,
      title: "Education Specialist",
      description: "Provide expertise on educational content",
      isOpen: true
    });
    
    this.createRole({
      projectId: project4.id,
      title: "Frontend Developer",
      description: "Develop and maintain the user interface",
      isOpen: true
    });
    
    this.createRole({
      projectId: project4.id,
      title: "UX Designer",
      description: "Design user interfaces and user experiences",
      isOpen: true
    });
    
    this.createRole({
      projectId: project5.id,
      title: "Co-founder (Technical)",
      description: "Technical co-founder with ML/AI experience",
      isOpen: true
    });
    
    this.createRole({
      projectId: project5.id,
      title: "ML Engineer",
      description: "Build and train machine learning models",
      isOpen: true
    });
    
    this.createRole({
      projectId: project5.id,
      title: "Education Expert",
      description: "Provide expertise on educational content and strategies",
      isOpen: true
    });
    
    this.createRole({
      projectId: project6.id,
      title: "Unity Developer",
      description: "Develop VR environments using Unity",
      isOpen: true
    });
    
    this.createRole({
      projectId: project6.id,
      title: "3D Artist",
      description: "Create 3D models and environments",
      isOpen: true
    });
    
    this.createRole({
      projectId: project6.id,
      title: "Game Designer",
      description: "Design interactive learning games",
      isOpen: true
    });
    
    this.createRole({
      projectId: project6.id,
      title: "Education Specialist",
      description: "Provide expertise on educational content",
      isOpen: true
    });
    
    // Create sample team members
    this.createTeamMember({
      projectId: project1.id,
      userId: user1.id,
      roleId: null,
      isFounder: true
    });
    
    this.createTeamMember({
      projectId: project1.id,
      userId: user2.id,
      roleId: null,
      isFounder: false
    });
    
    this.createTeamMember({
      projectId: project2.id,
      userId: user2.id,
      roleId: null,
      isFounder: true
    });
    
    this.createTeamMember({
      projectId: project3.id,
      userId: user1.id,
      roleId: null,
      isFounder: true
    });
    
    this.createTeamMember({
      projectId: project4.id,
      userId: user1.id,
      roleId: null,
      isFounder: true
    });
    
    this.createTeamMember({
      projectId: project5.id,
      userId: user2.id,
      roleId: null,
      isFounder: true
    });
    
    this.createTeamMember({
      projectId: project6.id,
      userId: user1.id,
      roleId: null,
      isFounder: true
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjects(filters: Partial<Project> = {}): Promise<Project[]> {
    let projects = Array.from(this.projects.values());
    
    // Apply filters if provided
    if (Object.keys(filters).length > 0) {
      projects = projects.filter(project => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined) return true;
          return project[key as keyof Project] === value;
        });
      });
    }
    
    return projects;
  }
  
  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.isFeatured
    );
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: now,
      isFeatured: false
    };
    this.projects.set(id, project);
    return project;
  }
  
  async updateProject(id: number, projectUpdate: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...projectUpdate };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // Role operations
  async getRoles(projectId: number): Promise<Role[]> {
    return Array.from(this.roles.values()).filter(
      (role) => role.projectId === projectId
    );
  }
  
  async createRole(insertRole: InsertRole): Promise<Role> {
    const id = this.currentRoleId++;
    const role: Role = { ...insertRole, id };
    this.roles.set(id, role);
    return role;
  }
  
  async updateRole(id: number, roleUpdate: Partial<Role>): Promise<Role | undefined> {
    const role = this.roles.get(id);
    if (!role) return undefined;
    
    const updatedRole = { ...role, ...roleUpdate };
    this.roles.set(id, updatedRole);
    return updatedRole;
  }
  
  async deleteRole(id: number): Promise<boolean> {
    return this.roles.delete(id);
  }
  
  // Team member operations
  async getTeamMembers(projectId: number): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(
      (member) => member.projectId === projectId
    );
  }
  
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }
  
  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamMemberId++;
    const now = new Date();
    const teamMember: TeamMember = { ...insertTeamMember, id, joinedAt: now };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }
  
  async removeTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }
  
  // Application operations
  async getApplications(projectId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (application) => application.projectId === projectId
    );
  }
  
  async getUserApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (application) => application.userId === userId
    );
  }
  
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const now = new Date();
    const application: Application = { 
      ...insertApplication, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.applications.set(id, application);
    return application;
  }
  
  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, status };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }
  
  // School operations
  async getSchools(): Promise<School[]> {
    return Array.from(this.schools.values());
  }
  
  async getSchool(id: number): Promise<School | undefined> {
    return this.schools.get(id);
  }
  
  async createSchool(insertSchool: InsertSchool): Promise<School> {
    const id = this.currentSchoolId++;
    const school: School = { ...insertSchool, id };
    this.schools.set(id, school);
    return school;
  }
}

export const storage = new MemStorage();
