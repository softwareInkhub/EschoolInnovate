import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Project model
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  banner: text("banner"),
  category: text("category").notNull(),
  stage: text("stage").notNull(),
  teamSize: integer("team_size").notNull(),
  maxTeamSize: integer("max_team_size").notNull(),
  website: text("website"),
  problem: text("problem"),
  market: text("market"),
  competition: text("competition"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  isFeatured: true,
});

// Role model
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  isOpen: boolean("is_open").default(true),
});

export const insertRoleSchema = createInsertSchema(roles).omit({
  id: true,
});

// Team member model
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: integer("user_id").notNull(),
  roleId: integer("role_id"),
  isFounder: boolean("is_founder").default(false),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  joinedAt: true,
});

// Application model
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: integer("user_id").notNull(),
  roleId: integer("role_id").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  status: true,
  createdAt: true,
});

// School model
export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  category: text("category").notNull(),
  courseCount: integer("course_count").default(0),
});

export const insertSchoolSchema = createInsertSchema(schools).omit({
  id: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Role = typeof roles.$inferSelect;
export type InsertRole = z.infer<typeof insertRoleSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type School = typeof schools.$inferSelect;
export type InsertSchool = z.infer<typeof insertSchoolSchema>;

// Extended schemas for validations
export const projectFormSchema = insertProjectSchema.extend({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }).max(40, { message: "Project name must be less than 40 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(200, { message: "Description must be less than 200 characters" }),
  problem: z.string().max(500, { message: "Problem statement must be less than 500 characters" }).optional(),
  market: z.string().max(500, { message: "Market analysis must be less than 500 characters" }).optional(),
  competition: z.string().max(500, { message: "Competition analysis must be less than 500 characters" }).optional(),
  roles: z.array(insertRoleSchema.omit({ projectId: true })).optional(),
});

export const applicationFormSchema = insertApplicationSchema.extend({
  message: z.string().min(10, { message: "Please provide a message of at least 10 characters" }).max(500, { message: "Message must be less than 500 characters" }),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
