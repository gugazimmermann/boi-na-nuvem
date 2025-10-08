export interface TeamMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'Active' | 'Inactive';
  role: string;
  email: string;
  teams: string[];
}

export interface Customer {
  id: string;
  company: string;
  website: string;
  status: 'Customer' | 'Churned';
  title: string;
  description: string;
  users: string[];
  licenseUse: number;
}

export interface TableProps {
  teamMembers?: TeamMember[];
  customers?: Customer[];
  showTeamMembers?: boolean;
  showCustomers?: boolean;
}
