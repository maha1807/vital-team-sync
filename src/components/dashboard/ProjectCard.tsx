import { Calendar, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const progressPercentage = (project.completedTasks / project.tasksCount) * 100;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group cursor-pointer transition-smooth hover:shadow-card hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${project.color}`} />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {project.completedTasks} completed
            </span>
            <span>{project.tasksCount - project.completedTasks} remaining</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Team
            </span>
            <Badge variant="secondary" className="text-xs">
              {project.members.length} members
            </Badge>
          </div>
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src="" alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 4 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium">+{project.members.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Updated {formatDate(project.updatedAt)}
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Open Project
        </Button>
      </CardContent>
    </Card>
  );
}