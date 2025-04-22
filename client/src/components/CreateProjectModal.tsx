import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Trash } from "lucide-react";
import { projectFormSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProject } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/use-auth";

// Form schema type for the data
type FormValues = z.infer<typeof projectFormSchema>;

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { user } = useAuth();
  const createProject = useCreateProject();
  const [roles, setRoles] = useState<{ title: string; description: string; skills: string }[]>([]);
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      problem: "",
      market: "",
      competition: "",
      stage: "Idea",
      teamSize: 1,
      maxTeamSize: 5,
      createdBy: user?.id || 0,
    },
  });
  
  // Add a new role
  const addRole = () => {
    setRoles([...roles, { title: "", description: "", skills: "" }]);
  };
  
  // Remove a role
  const removeRole = (index: number) => {
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };
  
  // Update a role field
  const updateRoleField = (index: number, field: keyof typeof roles[0], value: string) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setRoles(updatedRoles);
  };
  
  // Form submission handler
  function onSubmit(data: FormValues) {
    // Add the roles to the data
    const projectData = {
      ...data,
      roles: roles.map(role => ({
        title: role.title,
        description: role.description, 
        skills: role.skills.split(',').map(skill => skill.trim())
      }))
    };
    
    console.log('Submitting project data:', projectData);
    
    createProject.mutate(projectData, {
      onSuccess: () => {
        onClose();
        form.reset();
        setRoles([]);
      }
    });
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto w-[95vw] p-4 md:p-6" aria-describedby="project-form-description">
        <DialogHeader className="mb-4">
          <DialogTitle>Create a New Project</DialogTitle>
          <DialogDescription id="project-form-description">
            Fill out the information below to create your project and start building your team.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-2">
            {/* Project name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Project Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name..." {...field} className="h-9" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    A clear, concise name for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your project in detail..." 
                      className="min-h-[100px] text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Category*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EdTech">EdTech</SelectItem>
                      <SelectItem value="HealthTech">HealthTech</SelectItem>
                      <SelectItem value="FinTech">FinTech</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="Sustainability">Sustainability</SelectItem>
                      <SelectItem value="Social Impact">Social Impact</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Problem */}
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Problem Statement*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What problem does your project solve?" 
                      className="min-h-[80px] text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Banner URL (Optional) */}
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Banner Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="URL to a banner image for your project" 
                      {...field} 
                      value={field.value || ''}
                      className="h-9 text-sm"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Add a URL to an image that represents your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Target Market */}
            <FormField
              control={form.control}
              name="market"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Target Market</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Who are your target users/customers?" 
                      className="min-h-[80px] text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Competition */}
            <FormField
              control={form.control}
              name="competition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Competition</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Who are your main competitors?" 
                      className="h-9 text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Project Stage */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Project Stage*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select project stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Idea">Idea</SelectItem>
                      <SelectItem value="Concept">Concept</SelectItem>
                      <SelectItem value="Validation">Validation</SelectItem>
                      <SelectItem value="Building MVP">Building MVP</SelectItem>
                      <SelectItem value="Launch Ready">Launch Ready</SelectItem>
                      <SelectItem value="Scaling">Scaling</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Max Team Size */}
            <FormField
              control={form.control}
              name="maxTeamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Maximum Team Size*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      max={20} 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      className="h-9 text-sm"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    The maximum number of team members you're looking for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Team Roles */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel className="text-base font-medium">Team Roles</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addRole}
                  className="gap-1 px-2 py-1 h-auto"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="text-sm">Add Role</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="border p-3 rounded-md space-y-2.5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Role {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRole(index)}
                        className="h-7 w-7 p-0"
                      >
                        <Trash className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2.5">
                      <div>
                        <FormLabel className="text-xs">Role Title</FormLabel>
                        <Input
                          value={role.title}
                          onChange={(e) => updateRoleField(index, "title", e.target.value)}
                          placeholder="e.g., Frontend Developer"
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <FormLabel className="text-xs">Description</FormLabel>
                        <Textarea
                          value={role.description}
                          onChange={(e) => updateRoleField(index, "description", e.target.value)}
                          placeholder="Describe the responsibilities"
                          className="min-h-[60px] text-sm"
                        />
                      </div>
                      
                      <div>
                        <FormLabel className="text-xs">Required Skills</FormLabel>
                        <Input
                          value={role.skills}
                          onChange={(e) => updateRoleField(index, "skills", e.target.value)}
                          placeholder="e.g., JavaScript, React (comma separated)"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hidden createdBy field */}
            <input type="hidden" {...form.register("createdBy")} value={user?.id} />
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createProject.isPending}
                className="w-full sm:w-auto"
              >
                {createProject.isPending ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}