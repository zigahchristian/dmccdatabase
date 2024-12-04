export interface User {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    status: 'active' | 'offline'
    lastSeen: string
    location: string
    bio: string
    skills: string[]
    projects: {
      name: string
      role: string
      status: 'completed' | 'ongoing' | 'planned'
    }[]
  }
  
  export const users: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      role: 'Senior Developer',
      status: 'active',
      lastSeen: 'now',
      location: 'San Francisco, CA',
      bio: 'Full-stack developer with 5 years of experience in React and Node.js',
      skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
      projects: [
        { name: 'E-commerce Platform', role: 'Lead Developer', status: 'completed' },
        { name: 'Analytics Dashboard', role: 'Frontend Developer', status: 'ongoing' }
      ]
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      role: 'UX Designer',
      status: 'offline',
      lastSeen: '2 hours ago',
      location: 'New York, NY',
      bio: 'Creative designer focused on building intuitive user experiences',
      skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
      projects: [
        { name: 'Mobile App Redesign', role: 'Lead Designer', status: 'completed' },
        { name: 'Design System', role: 'UX Designer', status: 'planned' }
      ]
    }
  ]