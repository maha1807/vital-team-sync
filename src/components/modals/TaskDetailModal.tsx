import { useState } from 'react';
import { X, User, Calendar, Flag, Clock, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Task, TaskPriority, TaskStatus, User as UserType } from '@/types';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  projectMembers: UserType[];
}

const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
];

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'todo', label: 'To Do', color: 'bg-slate-500' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { value: 'review', label: 'Review', color: 'bg-yellow-500' },
  { value: 'done', label: 'Done', color: 'bg-green-500' },
];

export function TaskDetailModal({ isOpen, onClose, task, onTaskUpdated, projectMembers }: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [assigneeId, setAssigneeId] = useState(task.assignee?.id || '');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate task update
    setTimeout(() => {
      const assignee = projectMembers.find(member => member.id === assigneeId);
      
      const updatedTask: Task = {
        ...task,
        title,
        description: description || undefined,
        status,
        priority,
        assignee,
        dueDate: dueDate?.toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onTaskUpdated(updatedTask);
      
      toast({
        title: "Task updated!",
        description: "Changes have been saved successfully.",
      });

      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    // Reset fields to original values
    setTitle(task.title);
    setDescription(task.description || '');
    setAssigneeId(task.assignee?.id || '');
    setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setPriority(task.priority);
    setStatus(task.status);
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return format(new Date(dateString), 'PPP');
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <Card className="relative z-10 w-full max-w-2xl glass border-border/50 animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl font-bold">Task Details</CardTitle>
            <div className={`h-3 w-3 rounded-full ${statusOptions.find(s => s.value === task.status)?.color}`} />
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="hero" size="sm" onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-1" />
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label>Task Title</Label>
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold"
              />
            ) : (
              <h3 className="text-lg font-semibold">{task.title}</h3>
            )}
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
                placeholder="Add a description..."
              />
            ) : (
              <p className="text-muted-foreground">
                {task.description || "No description provided"}
              </p>
            )}
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
                <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="w-fit">
                  {statusOptions.find(s => s.value === task.status)?.label}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Priority
              </Label>
              {isEditing ? (
                <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="w-fit flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${priorityOptions.find(p => p.value === task.priority)?.color}`} />
                  {priorityOptions.find(p => p.value === task.priority)?.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Assignee
            </Label>
            {isEditing ? (
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {projectMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="" alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-3">
                {task.assignee ? (
                  <>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={task.assignee.name} />
                      <AvatarFallback>
                        {task.assignee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{task.assignee.name}</p>
                      <p className="text-sm text-muted-foreground">{task.assignee.role}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Unassigned</p>
                )}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Due Date
            </Label>
            {isEditing ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Badge 
                variant={isOverdue ? "destructive" : "outline"} 
                className="w-fit flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                {formatDate(task.dueDate)}
                {isOverdue && " (Overdue)"}
              </Badge>
            )}
          </div>

          {/* Task Metadata */}
          <div className="bg-accent/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold">Task Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <p><strong>Created:</strong> {format(new Date(task.createdAt), 'PPP')}</p>
              <p><strong>Last Updated:</strong> {format(new Date(task.updatedAt), 'PPP')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}