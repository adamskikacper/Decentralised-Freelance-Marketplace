import React from "react";
import { Link } from "react-router-dom";
import { FileText, User, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/UI/button";
import { DashboardSection, DashboardStats } from "../../Common";
import { JobsList } from "@/components/Job";
import FreelancerTable from "@/components/Profile/FreelancerTable";
import Breadcrumbs from "@/components/Layout/Breadcrumbs";

export interface HomeProps {
 /**
  * User data
  */
 user?: {
  name?: string;
  email?: string;
 };
 /**
  * Whether the component is in a loading state
  * @default false
  */
 isLoading?: boolean;
 /**
  * Callback when a message button is clicked
  */
 onMessage?: (userId: string) => void;
 /**
  * Callback when a job details button is clicked
  */
 onJobDetails?: (jobId: string) => void;
 /**
  * Callback when a freelancer details button is clicked
  */
 onFreelancerDetails?: (freelancerId: string) => void;
}

/**
 * Home - Client dashboard home component
 * Displays an overview of the client's activity, jobs, and top freelancers
 */
const Home: React.FC<HomeProps> = ({
 // user is not used in this component but kept for future use
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 user,
 isLoading = false,
 onMessage,
 onJobDetails,
 onFreelancerDetails,
}) => {
 // Sample data - would come from API in a real app
 const dashboardStats = [
  {
   title: "Active Jobs",
   value: "5",
   icon: <Briefcase className="h-5 w-5 text-primary" />,
   change: {
    value: "2",
    isPositive: true,
    label: "from last month",
   },
  },
  {
   title: "Hired Freelancers",
   value: "12",
   icon: <User className="h-5 w-5 text-primary" />,
   change: {
    value: "3",
    isPositive: true,
    label: "from last month",
   },
  },
  {
   title: "Total Spent",
   value: "32.5 ETH",
   icon: <DollarSign className="h-5 w-5 text-primary" />,
   change: {
    value: "12.5 ETH",
    isPositive: true,
    label: "from last month",
   },
  },
  {
   title: "Completed Jobs",
   value: "28",
   icon: <FileText className="h-5 w-5 text-primary" />,
   change: {
    value: "5",
    isPositive: true,
    label: "from last month",
   },
  },
 ];

 // Sample jobs data
 const activeJobs = [
  {
   id: "job1",
   title: "Wallet Integration for NFT Marketplace",
   freelancer: {
    id: "alex123",
    name: "Alex K.",
   },
   dueDate: "Due in 8 days",
   status: "In Progress",
   cost: "3.5 ETH",
   progress: 60,
  },
  {
   id: "job2",
   title: "Smart Contract for Token Vesting",
   freelancer: {
    id: "maria123",
    name: "Maria S.",
   },
   dueDate: "Due in 15 days",
   status: "Just Started",
   cost: "5.0 ETH",
   progress: 15,
  },
  {
   id: "job3",
   title: "DeFi Interface Redesign",
   freelancer: {
    id: "david123",
    name: "David C.",
   },
   dueDate: "Completed on April 2, 2023",
   status: "Completed",
   cost: "4.0 ETH",
   progress: 100,
  },
 ];

 // Sample freelancers data
 const topFreelancers = [
  {
   id: "alex123",
   name: "Alex Kotov",
   title: "Frontend Developer",
   specialty: "React, Web3",
   jobsCount: "2 Active",
   status: "Active",
   rating: 4.9,
  },
  {
   id: "maria123",
   name: "Maria Solovey",
   title: "Smart Contract Developer",
   specialty: "Solidity, Audits",
   jobsCount: "1 Active",
   status: "Active",
   rating: 4.8,
  },
  {
   id: "david123",
   name: "David Chen",
   title: "UI/UX Designer",
   specialty: "Figma, Web Design",
   jobsCount: "1 Active",
   status: "Active",
   rating: 4.7,
  },
 ];

 // Note: Navigation is handled by the Link components

 // Handler for hiring a freelancer
 const handleHireFreelancer = (freelancerId: string) => {
  console.log(`Hiring freelancer: ${freelancerId}`);
  // Implementation would go here
 };

 return (
  <div className="space-y-8">
   <Breadcrumbs
    items={[{ label: "Dashboard", path: "/dashboard" }, { label: "Home" }]}
   />

   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold tracking-tight">Client Dashboard</h1>
     <p className="text-muted-foreground mt-1">
      Find and manage your jobs with top freelancers.
     </p>
    </div>
    <Button asChild>
     <Link to="/dashboard/post-job">Post a Job</Link>
    </Button>
   </div>

   {/* Summary Stats */}
   <DashboardStats stats={dashboardStats} isLoading={isLoading} />

   {/* Active Jobs Section */}
   <DashboardSection
    title="Active Jobs"
    description="Your current and recently completed jobs"
    action={
     <Button variant="outline" size="sm" asChild>
      <Link to="/dashboard/jobs">View All</Link>
     </Button>
    }
    isLoading={isLoading}
   >
    <JobsList
     jobs={activeJobs}
     onMessage={onMessage}
     onDetails={onJobDetails}
    />
   </DashboardSection>

   {/* Top Freelancers Section */}
   <DashboardSection
    title="Top Rated Freelancers"
    description="Discover top talent for your projects"
    action={
     <Button variant="outline" size="sm" asChild>
      <Link to="/dashboard/freelancers">View All</Link>
     </Button>
    }
    isLoading={isLoading}
   >
    <FreelancerTable
     freelancers={topFreelancers}
     onHire={handleHireFreelancer}
     onMessage={onMessage}
     onView={onFreelancerDetails}
    />
   </DashboardSection>
  </div>
 );
};

export default Home;
