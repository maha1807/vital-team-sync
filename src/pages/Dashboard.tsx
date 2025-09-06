import { useState } from 'react';
import { Plus, BarChart3, Users, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { mockProjects, mockTasks, currentUser } from '@/data/mockData';
import heroBackground from '@/assets/hero-background.png';

export function Dashboard() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Calculate stats
  const totalProjects = mockProjects.length;
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.status === 'done').length;
  const myTasks = mockTasks.filter(task => task.assignee?.id === currentUser.id);

  const stats = [
    {
      title: 'Active Projects',
      value: totalProjects,
      icon: BarChart3,
      description: 'Projects in progress'
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
      description: 'Across all projects'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle2,
      description: `${totalTasks - completedTasks} remaining`
    },
    {
      title: 'My Tasks',
      value: myTasks.length,
      icon: Clock,
      description: 'Assigned to you'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="relative container mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome back, <span className="gradient-primary bg-clip-text text-transparent">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent collaboration hub is ready. Let's make today productive together.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="animate-glow">
              <Plus className="h-5 w-5 mr-2" />
              Create New Project
            </Button>
            <Button variant="glass" size="xl">
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass border-border/50 hover:shadow-card transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <p className="text-muted-foreground">Manage and track your active projects</p>
            </div>
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProjectId(project.id)}
              />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.assignee?.name} • {task.status.replace('-', ' ')}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;