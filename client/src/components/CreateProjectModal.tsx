import { X, Plus, Link2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectFormSchema } from '@shared/schema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { apiRequest, queryClient } from '@/lib/queryClient';

type FormValues = z.infer<typeof projectFormSchema>;
type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      stage: '',
      teamSize: 1,
      maxTeamSize: 5,
      website: '',
      problem: '',
      market: '',
      competition: '',
      createdBy: 1, // For demo purposes
    },
  });

  function onSubmit(data: FormValues) {
    apiRequest('POST', '/api/projects', {
      ...data,
      banner: bannerImage
    }).then(() => {
      toast({
        title: "Project created",
        description: "Your project has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      onClose();
      form.reset();
      setStep(1);
      setBannerImage(null);
    }).catch((error) => {
      toast({
        title: "Failed to create project",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    });
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we'd upload the file to a server or CDN
      // For now, just use a placeholder or URL.createObjectURL(file)
      setBannerImage('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');
    }
  };

  const nextStep = () => {
    form.trigger(['name', 'description']).then(isValid => {
      if (isValid) setStep(prev => Math.min(prev + 1, 5));
    });
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Project</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Banner Upload */}
            <div>
              <Label htmlFor="banner" className="mb-2 block">Project Banner</Label>
              <div className="relative">
                {bannerImage ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <img 
                      src={bannerImage} 
                      alt="Project banner" 
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => setBannerImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label 
                    htmlFor="banner-upload" 
                    className="flex items-center justify-center bg-muted rounded-lg p-6 cursor-pointer hover:bg-accent transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-primary rounded-lg p-2 mb-2">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <span>Drop or upload your banner image here</span>
                      <input 
                        id="banner-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleBannerUpload}
                      />
                    </div>
                  </label>
                )}
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${
                      step >= item ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span className={step >= item ? 'text-white' : 'text-muted-foreground'}>
                      {item}
                    </span>
                  </div>
                  <span className={`text-xs ${step >= item ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item === 1 && 'Description'}
                    {item === 2 && 'Problem'}
                    {item === 3 && 'Market'}
                    {item === 4 && 'Competition'}
                    {item === 5 && 'Details'}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Form Fields - Step 1 (Description) */}
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Type your project name..."
                            {...field}
                            maxLength={40}
                          />
                          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {field.value.length}/40
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Introduce your project idea in simple terms..."
                            className="min-h-[120px]"
                            {...field}
                            maxLength={200}
                          />
                          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {field.value.length}/200
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Form Fields - Step 2 (Problem) */}
            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Statement</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="What problem are you solving? Why is it important?"
                            className="min-h-[200px]"
                            {...field}
                            maxLength={500}
                          />
                          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Form Fields - Step 3 (Market) */}
            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="market"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Analysis</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Describe your target market, market size, and growth potential..."
                            className="min-h-[200px]"
                            {...field}
                            maxLength={500}
                          />
                          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Form Fields - Step 4 (Competition) */}
            {step === 4 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="competition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competition Analysis</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Who are your competitors? How is your solution different?"
                            className="min-h-[200px]"
                            {...field}
                            maxLength={500}
                          />
                          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Form Fields - Step 5 (Details) */}
            {step === 5 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Stage</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What stage is your startup in?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                          <SelectItem value="Building MVP">Building MVP</SelectItem>
                          <SelectItem value="Active Project">Active Project</SelectItem>
                          <SelectItem value="Looking for Co-founder">Looking for Co-founder</SelectItem>
                          <SelectItem value="New Project">New Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What field is your startup in?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tech">Technology</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="AI">Artificial Intelligence</SelectItem>
                          <SelectItem value="VR/AR">VR/AR</SelectItem>
                          <SelectItem value="Analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxTeamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Team Size</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Maximum number of team members" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL (optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="https://yourproject.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Team Positions */}
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center text-foreground hover:text-primary"
                  >
                    <div className="bg-primary rounded-lg p-1 mr-2">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                    Add open positions on your team
                  </Button>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <DialogFooter className="flex justify-between border-t pt-4">
              <div>
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                {step < 5 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Publish
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
