import { useState } from 'react';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/types';
import { mockTasks } from '@/data/mockData';

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-slate-500', count: 0 },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500', count: 0 },
  review: { label: 'Review', color: 'bg-yellow-500', count: 0 },
  done: { label: 'Done', color: 'bg-green-500', count: 0 },
};

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500',
};

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Card className="group cursor-pointer transition-smooth hover:shadow-md border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-sm font-medium leading-snug">
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
              <span className="text-xs text-muted-foreground capitalize">
                {task.priority} priority
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'todo')}>
                Move to To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in-progress')}>
                Move to In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'review')}>
                Move to Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'done')}>
                Move to Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          {task.assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src="" alt={task.assignee.name} />
                <AvatarFallback className="text-xs">
                  {task.assignee.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {task.assignee.name.split(' ')[0]}
              </span>
            </div>
          )}

          {task.dueDate && (
            <Badge 
              variant={isOverdue ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {formatDate(task.dueDate)}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface TaskBoardProps {
  projectId: string;
}

export function TaskBoard({ projectId }: TaskBoardProps) {
  const [tasks, setTasks] = useState(mockTasks.filter(task => task.projectId === projectId));

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const columns = Object.keys(statusConfig) as TaskStatus[];
  
  // Count tasks per column
  const taskCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<TaskStatus, number>);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Task Board</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="hero" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((status) => (
          <div key={status} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${statusConfig[status].color}`} />
              <h3 className="font-medium">{statusConfig[status].label}</h3>
              <Badge variant="secondary" className="ml-auto">
                {taskCounts[status] || 0}
              </Badge>
            </div>

            {/* Column Content */}
            <div className="space-y-3 min-h-[200px]">
              {tasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={handleStatusChange}
                  />
                ))}
              
              {/* Add Task Button */}
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-border/50 h-12 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}