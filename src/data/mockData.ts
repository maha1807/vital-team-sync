import { User, Project, Task, Discussion, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@synergysphere.com',
    avatar: '👨‍💻',
    role: 'Project Manager'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@synergysphere.com',
    avatar: '👩‍🎨',
    role: 'UX Designer'
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@synergysphere.com',
    avatar: '👨‍🔬',
    role: 'Full Stack Developer'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    email: 'emma.thompson@synergysphere.com',
    avatar: '👩‍💼',
    role: 'Product Owner'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@synergysphere.com',
    avatar: '👨‍🚀',
    role: 'DevOps Engineer'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'SynergySphere Platform',
    description: 'Building the next-generation team collaboration platform with intelligent features and seamless user experience.',
    color: 'from-blue-500 to-purple-600',
    members: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    tasksCount: 24,
    completedTasks: 18
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application with focus on user experience and performance optimization.',
    color: 'from-green-500 to-teal-600',
    members: [mockUsers[1], mockUsers[2], mockUsers[4]],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-08T16:45:00Z',
    tasksCount: 16,
    completedTasks: 12
  },
  {
    id: '3',
    name: 'API Integration Hub',
    description: 'Developing a centralized hub for all third-party API integrations and webhooks management.',
    color: 'from-orange-500 to-red-600',
    members: [mockUsers[2], mockUsers[4], mockUsers[0]],
    createdAt: '2024-02-20T11:00:00Z',
    updatedAt: '2024-03-09T13:20:00Z',
    tasksCount: 12,
    completedTasks: 8
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    description: 'Advanced analytics dashboard for tracking team performance, project insights, and productivity metrics.',
    color: 'from-purple-500 to-pink-600',
    members: [mockUsers[3], mockUsers[0], mockUsers[1]],
    createdAt: '2024-03-01T08:30:00Z',
    updatedAt: '2024-03-11T10:15:00Z',
    tasksCount: 20,
    completedTasks: 5
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user authentication flow',
    description: 'Create wireframes and user flows for the complete authentication process including login, signup, and password recovery.',
    status: 'done',
    priority: 'high',
    assignee: mockUsers[1],
    projectId: '1',
    dueDate: '2024-03-15T23:59:59Z',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T14:30:00Z'
  },
  {
    id: '2',
    title: 'Implement task board component',
    description: 'Build the interactive Kanban-style task board with drag and drop functionality.',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[2],
    projectId: '1',
    dueDate: '2024-03-20T23:59:59Z',
    createdAt: '2024-03-05T09:00:00Z',
    updatedAt: '2024-03-10T16:45:00Z'
  },
  {
    id: '3',
    title: 'Set up project database schema',
    description: 'Design and implement the database schema for projects, tasks, and user relationships.',
    status: 'review',
    priority: 'medium',
    assignee: mockUsers[4],
    projectId: '1',
    dueDate: '2024-03-18T23:59:59Z',
    createdAt: '2024-03-02T11:30:00Z',
    updatedAt: '2024-03-08T13:20:00Z'
  },
  {
    id: '4',
    title: 'Create notification system',
    description: 'Implement real-time notifications for task updates, assignments, and project changes.',
    status: 'todo',
    priority: 'medium',
    assignee: mockUsers[2],
    projectId: '1',
    dueDate: '2024-03-25T23:59:59Z',
    createdAt: '2024-03-08T14:00:00Z',
    updatedAt: '2024-03-08T14:00:00Z'
  },
  {
    id: '5',
    title: 'Mobile responsive design testing',
    description: 'Test and optimize the platform for mobile devices and tablets.',
    status: 'todo',
    priority: 'low',
    assignee: mockUsers[1],
    projectId: '1',
    dueDate: '2024-03-30T23:59:59Z',
    createdAt: '2024-03-10T10:15:00Z',
    updatedAt: '2024-03-10T10:15:00Z'
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    projectId: '1',
    title: 'UI/UX Design Direction Discussion',
    author: mockUsers[0],
    content: 'I\'d like to discuss our approach to the overall design direction. Should we go with a more minimalist approach or embrace the glass morphism trend?',
    replies: [
      {
        id: '1',
        author: mockUsers[1],
        content: 'I think glass morphism could work well for our modern collaboration platform. It adds depth without being overwhelming.',
        createdAt: '2024-03-08T10:30:00Z'
      },
      {
        id: '2',
        author: mockUsers[3],
        content: 'Agreed! We should also consider accessibility. Glass effects should not compromise readability.',
        createdAt: '2024-03-08T11:15:00Z'
      }
    ],
    createdAt: '2024-03-08T09:45:00Z',
    updatedAt: '2024-03-08T11:15:00Z'
  },
  {
    id: '2',
    projectId: '1',
    title: 'Performance Optimization Strategies',
    author: mockUsers[2],
    content: 'Let\'s discuss our approach to performance optimization. I\'ve identified several areas where we can improve loading times.',
    replies: [
      {
        id: '3',
        author: mockUsers[4],
        content: 'Great initiative! I suggest we implement lazy loading for the task boards and optimize our API calls.',
        createdAt: '2024-03-09T14:20:00Z'
      }
    ],
    createdAt: '2024-03-09T13:30:00Z',
    updatedAt: '2024-03-09T14:20:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Implement task board component"',
    read: false,
    createdAt: '2024-03-10T16:45:00Z',
    relatedId: '2'
  },
  {
    id: '2',
    type: 'discussion_reply',
    title: 'New Discussion Reply',
    message: 'Sarah Johnson replied to "UI/UX Design Direction Discussion"',
    read: false,
    createdAt: '2024-03-08T10:30:00Z',
    relatedId: '1'
  },
  {
    id: '3',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Sarah Johnson completed "Design user authentication flow"',
    read: true,
    createdAt: '2024-03-05T14:30:00Z',
    relatedId: '1'
  },
  {
    id: '4',
    type: 'project_update',
    title: 'Project Update',
    message: 'SynergySphere Platform has reached 75% completion',
    read: true,
    createdAt: '2024-03-10T14:30:00Z',
    relatedId: '1'
  }
];

// Current user for demo purposes
export const currentUser = mockUsers[0];