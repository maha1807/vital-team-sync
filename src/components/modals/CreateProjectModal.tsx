import { useState } from 'react';
import { X, Users, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: any) => void;
}

const colorOptions = [
  { name: 'Blue to Purple', value: 'from-blue-500 to-purple-600' },
  { name: 'Green to Teal', value: 'from-green-500 to-teal-600' },
  { name: 'Orange to Red', value: 'from-orange-500 to-red-600' },
  { name: 'Purple to Pink', value: 'from-purple-500 to-pink-600' },
  { name: 'Cyan to Blue', value: 'from-cyan-500 to-blue-600' },
  { name: 'Emerald to Green', value: 'from-emerald-500 to-green-600' },
];

export function CreateProjectModal({ isOpen, onClose, onProjectCreated }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate project creation
    setTimeout(() => {
      const newProject = {
        id: Date.now().toString(),
        name,
        description,
        color: selectedColor,
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasksCount: 0,
        completedTasks: 0,
      };

      onProjectCreated(newProject);
      
      toast({
        title: "Project created!",
        description: `${name} has been created successfully.`,
      });

      // Reset form
      setName('');
      setDescription('');
      setSelectedColor(colorOptions[0].value);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <Card className="relative z-10 w-full max-w-2xl glass border-border/50 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Create New Project</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="project-name" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-lg"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project goals and objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Color Theme */}
            <div className="space-y-3">
              <Label>Project Color Theme</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedColor === color.value 
                        ? 'border-primary shadow-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`h-8 w-full rounded bg-gradient-to-r ${color.value} mb-2`} />
                    <span className="text-sm font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Features Preview */}
            <div className="bg-accent/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                What you'll get:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Badge variant="secondary" className="justify-start">
                  <Calendar className="h-3 w-3 mr-1" />
                  Task Management
                </Badge>
                <Badge variant="secondary" className="justify-start">
                  <Users className="h-3 w-3 mr-1" />
                  Team Collaboration
                </Badge>
                <Badge variant="secondary" className="justify-start">
                  Real-time Updates
                </Badge>
                <Badge variant="secondary" className="justify-start">
                  Progress Tracking
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="hero" 
                disabled={isLoading || !name.trim()}
                className="flex-1"
              >
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}