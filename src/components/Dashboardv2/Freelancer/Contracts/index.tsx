import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { DashboardSection } from "../../Common";
import { JobsList } from "@/components/Job";
import Breadcrumbs from "@/components/Layout/Breadcrumbs";
import { FileText, CheckCircle } from "lucide-react";

export interface ContractsProps {
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
  * Callback when a client details button is clicked
  */
 onClientDetails?: (clientId: string) => void;
}

/**
 * Contracts - Freelancer contracts component
 * Displays a list of the freelancer's active and completed contracts
 */
const Contracts: React.FC<ContractsProps> = ({
 isLoading = false,
 onMessage,
 onJobDetails,
 onClientDetails,
}) => {
 // Sample contracts data - would come from API in a real app
 const allContracts = [
  {
   id: "contract1",
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
   id: "contract2",
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
   id: "contract3",
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
  {
   id: "contract4",
   title: "Blockchain Analytics Dashboard",
   freelancer: {
    id: "sarah123",
    name: "Sarah L.",
   },
   dueDate: "Completed on March 15, 2023",
   status: "Completed",
   cost: "6.0 ETH",
   progress: 100,
  },
  {
   id: "contract5",
   title: "Smart Contract Audit",
   freelancer: {
    id: "james123",
    name: "James W.",
   },
   dueDate: "Completed on February 28, 2023",
   status: "Completed",
   cost: "3.0 ETH",
   progress: 100,
  },
 ];

 // Filter active and completed contracts
 const activeContracts = allContracts.filter(
  (contract) => contract.status !== "Completed"
 );
 const completedContracts = allContracts.filter(
  (contract) => contract.status === "Completed"
 );

 return (
  <div className="space-y-8">
   <Breadcrumbs
    items={[{ label: "Dashboard", path: "/dashboard" }, { label: "Contracts" }]}
   />

   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold tracking-tight">My Contracts</h1>
     <p className="text-muted-foreground mt-1">
      View and manage all your current and past contracts.
     </p>
    </div>
    <Button asChild>
     <Link to="/dashboard/freelancer/find-jobs">Find More Jobs</Link>
    </Button>
   </div>

   {/* Active Contracts Section */}
   <DashboardSection
    title="Active Contracts"
    description="Your current contracts in progress"
    icon={<FileText className="h-5 w-5 text-primary" />}
    isLoading={isLoading}
   >
    {activeContracts.length > 0 ? (
     <JobsList
      jobs={activeContracts}
      showCreationDate={true}
      onMessage={onMessage}
      onDetails={onJobDetails}
     />
    ) : (
     <div className="p-6 text-center text-muted-foreground">
      <p>You don't have any active contracts at the moment.</p>
      <Button variant="outline" className="mt-4" asChild>
       <Link to="/dashboard/freelancer/find-jobs">Find Jobs</Link>
      </Button>
     </div>
    )}
   </DashboardSection>

   {/* Completed Contracts Section */}
   <DashboardSection
    title="Completed Contracts"
    description="Your past completed contracts"
    icon={<CheckCircle className="h-5 w-5 text-primary" />}
    isLoading={isLoading}
   >
    {completedContracts.length > 0 ? (
     <JobsList
      jobs={completedContracts}
      showCreationDate={true}
      onMessage={onMessage}
      onDetails={onJobDetails}
     />
    ) : (
     <div className="p-6 text-center text-muted-foreground">
      <p>You haven't completed any contracts yet.</p>
     </div>
    )}
   </DashboardSection>
  </div>
 );
};

export default Contracts;
