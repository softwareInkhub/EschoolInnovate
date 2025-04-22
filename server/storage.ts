import { 
  User, InsertUser, Project, InsertProject, Role, InsertRole, 
  TeamMember, InsertTeamMember, Application, InsertApplication,
  School, InsertSchool, Course, InsertCourse, Module, InsertModule,
  Lesson, InsertLesson, Instructor, InsertInstructor
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Storage interface with CRUD operations
export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
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
  getFeaturedSchools(): Promise<School[]>;
  getSchool(id: number): Promise<School | undefined>;
  createSchool(school: InsertSchool): Promise<School>;
  
  // Course operations
  getCourses(filters?: Partial<Course>): Promise<Course[]>;
  getPopularCourses(limit?: number): Promise<Course[]>;
  getFeaturedCourses(limit?: number): Promise<Course[]>;
  getNewCourses(limit?: number): Promise<Course[]>;
  getSchoolCourses(schoolId: number): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Module operations
  getModules(courseId: number): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // Lesson operations
  getLessons(moduleId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Instructor operations
  getInstructors(): Promise<Instructor[]>;
  getSchoolInstructors(schoolId: number): Promise<Instructor[]>;
  getInstructor(id: number): Promise<Instructor | undefined>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private roles: Map<number, Role>;
  private teamMembers: Map<number, TeamMember>;
  private applications: Map<number, Application>;
  private schools: Map<number, School>;
  private courses: Map<number, Course>;
  private modules: Map<number, Module>;
  private lessons: Map<number, Lesson>;
  private instructors: Map<number, Instructor>;
  
  private currentUserId: number;
  private currentProjectId: number;
  private currentRoleId: number;
  private currentTeamMemberId: number;
  private currentApplicationId: number;
  private currentSchoolId: number;
  private currentCourseId: number;
  private currentModuleId: number;
  private currentLessonId: number;
  private currentInstructorId: number;
  
  constructor() {
    // Initialize memory-based session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    this.users = new Map();
    this.projects = new Map();
    this.roles = new Map();
    this.teamMembers = new Map();
    this.applications = new Map();
    this.schools = new Map();
    this.courses = new Map();
    this.modules = new Map();
    this.lessons = new Map();
    this.instructors = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentRoleId = 1;
    this.currentTeamMemberId = 1;
    this.currentApplicationId = 1;
    this.currentSchoolId = 1;
    this.currentCourseId = 1;
    this.currentModuleId = 1;
    this.currentLessonId = 1;
    this.currentInstructorId = 1;
    
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
    const techSchool = this.createSchool({
      name: "Tech School",
      description: "Learn cutting-edge technologies and development practices",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      category: "Software Engineering",
      courseCount: 4,
      instructorsCount: 5,
      studentsCount: 1250,
      featured: true,
      rating: 4,
      categories: ["Web Development", "Mobile Development", "Cloud Computing", "DevOps"],
      logo: "https://images.unsplash.com/photo-1581094794329-c8112c4133a5",
      banner: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      established: "2018",
      location: "Bangalore, India",
      socialLinks: {
        website: "https://techschool.escool.ai",
        twitter: "https://twitter.com/techschool",
        linkedin: "https://linkedin.com/company/techschool",
        youtube: "https://youtube.com/techschool"
      }
    });
    
    const businessSchool = this.createSchool({
      name: "Business School",
      description: "Master business fundamentals and startup strategies",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      category: "Entrepreneurship",
      courseCount: 6,
      instructorsCount: 8,
      studentsCount: 980,
      featured: true,
      rating: 5,
      categories: ["Entrepreneurship", "Marketing", "Finance", "Leadership"],
      logo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      banner: "https://images.unsplash.com/photo-1462206092226-f46cf4128af8",
      established: "2019",
      location: "Mumbai, India",
      socialLinks: {
        website: "https://bizschool.escool.ai",
        twitter: "https://twitter.com/bizschool",
        linkedin: "https://linkedin.com/company/bizschool",
        youtube: "https://youtube.com/bizschool"
      }
    });
    
    const dataSchool = this.createSchool({
      name: "Data Science School",
      description: "Learn to build intelligent systems and analyze data",
      image: "https://images.unsplash.com/photo-1581094794329-c8112c4133a5",
      category: "AI & Machine Learning",
      courseCount: 5,
      instructorsCount: 6,
      studentsCount: 820,
      featured: true,
      rating: 4,
      categories: ["Machine Learning", "Data Analysis", "NLP", "Computer Vision"],
      logo: "https://images.unsplash.com/photo-1581094794329-c8112c4133a5",
      banner: "https://images.unsplash.com/photo-1564639580159-74905b8ed8a0",
      established: "2020",
      location: "Hyderabad, India",
      socialLinks: {
        website: "https://dataschool.escool.ai",
        twitter: "https://twitter.com/dataschool",
        linkedin: "https://linkedin.com/company/dataschool",
        youtube: "https://youtube.com/dataschool"
      }
    });
    
    const designSchool = this.createSchool({
      name: "Design School",
      description: "Master the principles of user-centered design",
      image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
      category: "UX/UI & Product Design",
      courseCount: 3,
      instructorsCount: 4,
      studentsCount: 650,
      featured: false,
      rating: 4,
      categories: ["UI Design", "UX Research", "Visual Design", "Interaction Design"],
      logo: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec",
      banner: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      established: "2021",
      location: "Pune, India",
      socialLinks: {
        website: "https://designschool.escool.ai",
        twitter: "https://twitter.com/designschool",
        linkedin: "https://linkedin.com/company/designschool",
        youtube: "https://youtube.com/designschool"
      }
    });
    
    // Create sample instructors
    const techInstructor1 = this.createInstructor({
      name: "Rajesh Kumar",
      title: "Senior Web Developer",
      bio: "Full-stack developer with 10+ years of experience in building web applications.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      schoolId: techSchool.id,
      socialLinks: {
        website: "https://rajeshkumar.com",
        twitter: "https://twitter.com/rajeshkumar",
        linkedin: "https://linkedin.com/in/rajeshkumar"
      }
    });
    
    const businessInstructor1 = this.createInstructor({
      name: "Priya Sharma",
      title: "Startup Consultant",
      bio: "Entrepreneur and business coach with experience in founding and scaling multiple startups.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      schoolId: businessSchool.id,
      socialLinks: {
        website: "https://priyasharma.com",
        twitter: "https://twitter.com/priyasharma",
        linkedin: "https://linkedin.com/in/priyasharma"
      }
    });
    
    const dataInstructor1 = this.createInstructor({
      name: "Vikram Singh",
      title: "AI Researcher",
      bio: "Data scientist with expertise in machine learning and artificial intelligence.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      schoolId: dataSchool.id,
      socialLinks: {
        website: "https://vikramsingh.com",
        twitter: "https://twitter.com/vikramsingh",
        linkedin: "https://linkedin.com/in/vikramsingh"
      }
    });
    
    const designInstructor1 = this.createInstructor({
      name: "Aisha Patel",
      title: "UX/UI Designer",
      bio: "Product designer specializing in user experience and interface design.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      schoolId: designSchool.id,
      socialLinks: {
        website: "https://aishapatel.com",
        twitter: "https://twitter.com/aishapatel",
        linkedin: "https://linkedin.com/in/aishapatel"
      }
    });
    
    // Create sample courses
    const webDevCourse = this.createCourse({
      title: "Modern Web Development",
      description: "Learn to build responsive and dynamic websites using the latest web technologies.",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      banner: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      introVideo: "https://www.youtube.com/watch?v=somevideocode",
      duration: 2400, // 40 hours
      schoolId: techSchool.id,
      instructorId: techInstructor1.id,
      level: "intermediate",
      category: "Web Development",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      price: 4999,
      discountedPrice: 3999,
      featured: true,
      popular: true,
      isNew: false,
      outcomes: [
        "Build responsive websites from scratch",
        "Create dynamic user interfaces with React",
        "Develop RESTful APIs with Node.js",
        "Deploy web applications to the cloud"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Understanding of programming concepts",
        "Computer with internet connection"
      ],
      language: "English"
    });
    
    const entrepreneurshipCourse = this.createCourse({
      title: "Startup Fundamentals",
      description: "Learn how to transform your idea into a successful startup.",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      banner: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      introVideo: "https://www.youtube.com/watch?v=somevideocode2",
      duration: 1800, // 30 hours
      schoolId: businessSchool.id,
      instructorId: businessInstructor1.id,
      level: "beginner",
      category: "Entrepreneurship",
      tags: ["Startup", "Business Model", "Pitching", "Funding"],
      price: 5999,
      discountedPrice: 4999,
      featured: true,
      popular: true,
      isNew: false,
      outcomes: [
        "Develop a solid business model",
        "Create a compelling pitch deck",
        "Understand startup funding options",
        "Build a minimum viable product (MVP)"
      ],
      requirements: [
        "No prerequisites required",
        "Passion for entrepreneurship",
        "Computer with internet connection"
      ],
      language: "English"
    });
    
    const mlCourse = this.createCourse({
      title: "Machine Learning Foundations",
      description: "Master the fundamentals of machine learning and start building intelligent systems.",
      thumbnail: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
      banner: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
      introVideo: "https://www.youtube.com/watch?v=somevideocode3",
      duration: 3000, // 50 hours
      schoolId: dataSchool.id,
      instructorId: dataInstructor1.id,
      level: "intermediate",
      category: "Machine Learning",
      tags: ["Python", "TensorFlow", "Data Science", "AI"],
      price: 6999,
      discountedPrice: 5999,
      featured: true,
      popular: true,
      isNew: true,
      outcomes: [
        "Understand machine learning concepts",
        "Build and train models using TensorFlow",
        "Apply ML to real-world problems",
        "Deploy ML models to production"
      ],
      requirements: [
        "Basic knowledge of Python",
        "Understanding of basic statistics",
        "Computer with internet connection"
      ],
      language: "English"
    });
    
    const uxDesignCourse = this.createCourse({
      title: "UX/UI Design Essentials",
      description: "Learn the principles and practices of user experience and interface design.",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      banner: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      introVideo: "https://www.youtube.com/watch?v=somevideocode4",
      duration: 2100, // 35 hours
      schoolId: designSchool.id,
      instructorId: designInstructor1.id,
      level: "beginner",
      category: "UX/UI Design",
      tags: ["Figma", "Design Thinking", "Prototyping", "User Research"],
      price: 4499,
      discountedPrice: 3499,
      featured: false,
      popular: false,
      isNew: true,
      outcomes: [
        "Apply design thinking methodology",
        "Create wireframes and prototypes",
        "Conduct user research and usability testing",
        "Build a professional design portfolio"
      ],
      requirements: [
        "No design experience required",
        "Interest in visual design and user experience",
        "Computer with internet connection"
      ],
      language: "English"
    });
    
    // Create sample modules for Web Development course
    const webDevModule1 = this.createModule({
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of the web.",
      courseId: webDevCourse.id,
      order: 1
    });
    
    const webDevModule2 = this.createModule({
      title: "JavaScript Essentials",
      description: "Learn the programming language of the web.",
      courseId: webDevCourse.id,
      order: 2
    });
    
    const webDevModule3 = this.createModule({
      title: "React Fundamentals",
      description: "Build dynamic user interfaces with React.",
      courseId: webDevCourse.id,
      order: 3
    });
    
    // Create sample lessons for HTML & CSS module
    this.createLesson({
      title: "Introduction to HTML",
      description: "Learn the basics of HTML and its structure.",
      moduleId: webDevModule1.id,
      order: 1,
      duration: 45,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
      preview: true
    });
    
    this.createLesson({
      title: "HTML Elements and Attributes",
      description: "Explore different HTML elements and their attributes.",
      moduleId: webDevModule1.id,
      order: 2,
      duration: 55,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
      preview: false
    });
    
    this.createLesson({
      title: "Introduction to CSS",
      description: "Learn the basics of CSS and styling web pages.",
      moduleId: webDevModule1.id,
      order: 3,
      duration: 50,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
      preview: false
    });
    
    this.createLesson({
      title: "CSS Box Model",
      description: "Understand the CSS box model and layout techniques.",
      moduleId: webDevModule1.id,
      order: 4,
      duration: 60,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/rIO5326FgPE",
      preview: false
    });
    
    // Create sample lessons for JavaScript module
    this.createLesson({
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript programming.",
      moduleId: webDevModule2.id,
      order: 1,
      duration: 60,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
      preview: true
    });
    
    this.createLesson({
      title: "JavaScript Functions",
      description: "Learn how to create and use functions in JavaScript.",
      moduleId: webDevModule2.id,
      order: 2,
      duration: 45,
      type: "video",
      videoUrl: "https://www.youtube.com/embed/xUI5Tsl2JpY",
      preview: false
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
  
  async getFeaturedSchools(): Promise<School[]> {
    return Array.from(this.schools.values()).filter(school => school.featured);
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
  
  // Course operations
  async getCourses(filters: Partial<Course> = {}): Promise<Course[]> {
    let courses = Array.from(this.courses.values());
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        courses = courses.filter(course => course[key as keyof Course] === value);
      }
    }
    
    return courses;
  }
  
  async getPopularCourses(limit: number = 10): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.popular)
      .sort((a, b) => (b.enrolledCount || 0) - (a.enrolledCount || 0))
      .slice(0, limit);
  }
  
  async getFeaturedCourses(limit: number = 10): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.featured)
      .slice(0, limit);
  }
  
  async getNewCourses(limit: number = 10): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.isNew)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, limit);
  }
  
  async getSchoolCourses(schoolId: number): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.schoolId === schoolId);
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const now = new Date();
    const course: Course = { 
      ...insertCourse, 
      id, 
      createdAt: now, 
      updatedAt: now,
      rating: 0,
      ratingCount: 0,
      enrolledCount: 0,
      lessonsCount: 0
    };
    this.courses.set(id, course);
    return course;
  }
  
  // Module operations
  async getModules(courseId: number): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getModule(id: number): Promise<Module | undefined> {
    return this.modules.get(id);
  }
  
  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = this.currentModuleId++;
    const module: Module = { ...insertModule, id };
    this.modules.set(id, module);
    return module;
  }
  
  // Lesson operations
  async getLessons(moduleId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }
  
  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    
    // Update the lessons count in the course
    const module = this.modules.get(insertLesson.moduleId);
    if (module) {
      const course = this.courses.get(module.courseId);
      if (course) {
        course.lessonsCount = (course.lessonsCount || 0) + 1;
        this.courses.set(course.id, course);
      }
    }
    
    return lesson;
  }
  
  // Instructor operations
  async getInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }
  
  async getSchoolInstructors(schoolId: number): Promise<Instructor[]> {
    return Array.from(this.instructors.values())
      .filter(instructor => instructor.schoolId === schoolId);
  }
  
  async getInstructor(id: number): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }
  
  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = this.currentInstructorId++;
    const instructor: Instructor = { 
      ...insertInstructor, 
      id,
      coursesCount: 0,
      studentsCount: 0,
      rating: 0
    };
    this.instructors.set(id, instructor);
    return instructor;
  }
}

export const storage = new MemStorage();
