import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { 
  projectFormSchema, 
  applicationFormSchema,
  insertUserSchema
} from "@shared/schema";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // API base route
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const featuredProjects = await storage.getFeaturedProjects();
      res.json(featuredProjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = projectFormSchema.parse(req.body);
      
      // Extract roles if included
      const roles = projectData.roles;
      delete projectData.roles;
      
      // Create the project
      const project = await storage.createProject(projectData);
      
      // Create roles if provided
      if (roles && roles.length > 0) {
        for (const role of roles) {
          await storage.createRole({
            ...role,
            projectId: project.id
          });
        }
      }
      
      // Add the creator as a team member (founder)
      await storage.createTeamMember({
        projectId: project.id,
        userId: projectData.createdBy,
        roleId: null,
        isFounder: true
      });
      
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const projectData = projectFormSchema.partial().parse(req.body);
      const updatedProject = await storage.updateProject(projectId, projectData);
      res.json(updatedProject);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  // Roles routes
  app.get("/api/projects/:id/roles", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const roles = await storage.getRoles(projectId);
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roles" });
    }
  });

  // Team members routes
  app.get("/api/projects/:id/team", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const teamMembers = await storage.getTeamMembers(projectId);
      
      // Enrich team members with user data
      const enrichedTeamMembers = await Promise.all(
        teamMembers.map(async (member) => {
          const user = await storage.getUser(member.userId);
          return {
            ...member,
            user: user ? {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
              bio: user.bio
            } : undefined
          };
        })
      );
      
      res.json(enrichedTeamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Applications routes
  app.post("/api/projects/:id/apply", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const applicationData = applicationFormSchema.parse(req.body);
      const application = await storage.createApplication({
        ...applicationData,
        projectId
      });
      
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to submit application" });
    }
  });
  
  // Direct join team (without application process)
  app.post("/api/projects/:id/join", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      // Check if project has reached max team size
      if (project.teamSize >= project.maxTeamSize) {
        return res.status(400).json({ error: "This project has reached its maximum team size" });
      }
      
      // Get authenticated user
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in to join a project" });
      }
      
      const userId = req.user.id;
      
      // Check if user is already a team member
      const existingTeamMembers = await storage.getTeamMembers(projectId);
      const isAlreadyMember = existingTeamMembers.some(member => member.userId === userId);
      
      if (isAlreadyMember) {
        return res.status(400).json({ error: "You are already a member of this team" });
      }
      
      // Create team member record
      const { roleId } = req.body;
      
      const teamMember = await storage.createTeamMember({
        projectId,
        userId,
        roleId: roleId || null,
        isFounder: false
      });
      
      // Update project team size
      await storage.updateProject(projectId, {
        teamSize: project.teamSize + 1
      });
      
      res.status(201).json(teamMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to join team" });
    }
  });

  // Schools routes
  app.get("/api/schools", async (_req, res) => {
    try {
      const schools = await storage.getSchools();
      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  });
  
  app.get("/api/schools/featured", async (_req, res) => {
    try {
      const featuredSchools = await storage.getFeaturedSchools();
      res.json(featuredSchools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured schools" });
    }
  });

  app.get("/api/schools/:id", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.id);
      if (isNaN(schoolId)) {
        return res.status(400).json({ error: "Invalid school ID" });
      }

      const school = await storage.getSchool(schoolId);
      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }

      res.json(school);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch school" });
    }
  });
  
  app.get("/api/schools/:id/courses", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.id);
      if (isNaN(schoolId)) {
        return res.status(400).json({ error: "Invalid school ID" });
      }

      const courses = await storage.getSchoolCourses(schoolId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch school courses" });
    }
  });
  
  app.get("/api/schools/:id/instructors", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.id);
      if (isNaN(schoolId)) {
        return res.status(400).json({ error: "Invalid school ID" });
      }

      const instructors = await storage.getSchoolInstructors(schoolId);
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch school instructors" });
    }
  });
  
  // Courses routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });
  
  app.get("/api/courses/featured", async (_req, res) => {
    try {
      const featuredCourses = await storage.getFeaturedCourses();
      res.json(featuredCourses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured courses" });
    }
  });
  
  app.get("/api/courses/popular", async (_req, res) => {
    try {
      const popularCourses = await storage.getPopularCourses();
      res.json(popularCourses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular courses" });
    }
  });
  
  app.get("/api/courses/new", async (_req, res) => {
    try {
      const newCourses = await storage.getNewCourses();
      res.json(newCourses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch new courses" });
    }
  });
  
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Get instructor details
      const instructor = await storage.getInstructor(course.instructorId);
      
      // Get modules for this course
      const modules = await storage.getModules(courseId);
      
      // For each module, get its lessons
      const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
          const lessons = await storage.getLessons(module.id);
          return { ...module, lessons };
        })
      );
      
      // Combine course, instructor, and modules with lessons
      const enrichedCourse = {
        ...course,
        instructor,
        modules: modulesWithLessons
      };

      res.json(enrichedCourse);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });
  
  // Modules routes
  app.get("/api/modules/:id", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      if (isNaN(moduleId)) {
        return res.status(400).json({ error: "Invalid module ID" });
      }

      const module = await storage.getModule(moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      // Get lessons for this module
      const lessons = await storage.getLessons(moduleId);
      
      // Combine module and lessons
      const enrichedModule = {
        ...module,
        lessons
      };

      res.json(enrichedModule);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch module" });
    }
  });
  
  // Lessons routes
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      if (isNaN(lessonId)) {
        return res.status(400).json({ error: "Invalid lesson ID" });
      }

      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });
  
  // Instructors routes
  app.get("/api/instructors", async (_req, res) => {
    try {
      const instructors = await storage.getInstructors();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructors" });
    }
  });
  
  app.get("/api/instructors/:id", async (req, res) => {
    try {
      const instructorId = parseInt(req.params.id);
      if (isNaN(instructorId)) {
        return res.status(400).json({ error: "Invalid instructor ID" });
      }

      const instructor = await storage.getInstructor(instructorId);
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }

      res.json(instructor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor" });
    }
  });

  // Users routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Remove password before sending response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Remove password before sending response
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
