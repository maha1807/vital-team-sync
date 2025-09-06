export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  tasksCount: number;
  completedTasks: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  projectId: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Discussion {
  id: string;
  projectId: string;
  title: string;
  author: User;
  content: string;
  replies: DiscussionReply[];
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionReply {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'project_update' | 'discussion_reply';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}