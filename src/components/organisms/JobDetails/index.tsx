import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Calendar, Clock } from "lucide-react";
import { getJobDetails } from "@/shared/services/job.service";
import type { JobDetails as JobDetailsType } from "@/shared/models/job/model";

interface JobDetailsProps {
 onClose?: () => void;
}

export const JobDetails = ({ onClose }: JobDetailsProps) => {
 const navigate = useNavigate();
 const { jobId } = useParams();
 const [job, setJob] = useState<JobDetailsType | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchJobDetails = async () => {
   if (!jobId) {
    setError("No job ID provided");
    setIsLoading(false);
    return;
   }

   try {
    setIsLoading(true);
    const jobData = await getJobDetails(jobId);
    if (jobData) {
     setJob(jobData);
    } else {
     setError("Job not found");
    }
   } catch (err) {
    setError("Failed to fetch job details");
    console.error("Error fetching job details:", err);
   } finally {
    setIsLoading(false);
   }
  };

  fetchJobDetails();
 }, [jobId]);

 const handleMessageClick = () => {
  if (job) {
   navigate(`/messages/${job.freelancer.id}`);
  }
 };

 if (isLoading) {
  return (
   <div className="flex justify-center items-center h-64">
    <div className="text-center">
     <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
     <p className="text-muted-foreground">Loading job details...</p>
    </div>
   </div>
  );
 }

 if (error || !job) {
  return (
   <div className="flex justify-center items-center h-64">
    <div className="text-center">
     <p className="text-red-500 mb-2">Error: {error || "Job not found"}</p>
     <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
     >
      Go Back
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="space-y-8">
   <div className="flex items-start justify-between">
    <div>
     <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
     <div className="flex items-center gap-2">
      <span
       className={`px-2.5 py-1 text-xs font-medium rounded-full ${
        job.status === "In Progress"
         ? "bg-green-100 text-green-800"
         : job.status === "Completed"
         ? "bg-gray-100 text-gray-800"
         : "bg-yellow-100 text-yellow-800"
       }`}
      >
       {job.status}
      </span>
      <span>{job.budget}</span>
     </div>
    </div>
    {onClose && (
     <button onClick={onClose} className="p-2 rounded-md hover:bg-secondary">
      ×
     </button>
    )}
   </div>

   <div className="space-y-6 rounded-xl glass-card p-6">
    <div>
     <h3 className="text-lg font-semibold mb-2">Job Details</h3>
     <p className="text-muted-foreground">{job.description}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-primary" />
      <span>Start: {job.startDate}</span>
     </div>
     <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-primary" />
      <span>Due: {job.dueDate}</span>
     </div>
    </div>

    <div>
     <div className="flex justify-between text-sm mb-1">
      <span className="text-muted-foreground">Progress</span>
      <span className="font-medium">{job.progress}%</span>
     </div>
     <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
      <div
       className="h-full bg-primary rounded-full"
       style={{ width: `${job.progress}%` }}
      ></div>
     </div>
    </div>
   </div>

   <div className="rounded-xl glass-card p-6">
    <div className="flex items-center gap-3 border-b pb-4 mb-4">
     <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
      <User className="h-5 w-5" />
     </div>
     <div>
      <p className="font-medium">{job.freelancer.name}</p>
      <p className="text-sm text-muted-foreground">{job.freelancer.role}</p>
     </div>
     <button
      onClick={handleMessageClick}
      className="ml-auto px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
     >
      Message
     </button>
    </div>
   </div>

   <div className="rounded-xl glass-card p-6 space-y-4">
    <h3 className="text-lg font-semibold mb-2">Milestones</h3>
    <div className="space-y-4">
     {job.milestones.map((milestone, index) => (
      <div
       key={milestone.id}
       className="p-4 bg-secondary/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
       <div>
        <div className="flex items-center gap-2">
         <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs">
          {index + 1}
         </span>
         <p className="font-medium">{milestone.title}</p>
        </div>
        <p className="text-sm text-muted-foreground ml-8">
         Due: {milestone.dueDate}
        </p>
       </div>
       <div className="flex items-center gap-4">
        <span
         className={`px-2.5 py-1 text-xs font-medium rounded-full ${
          milestone.status === "Completed"
           ? "bg-green-100 text-green-800"
           : "bg-yellow-100 text-yellow-800"
         }`}
        >
         {milestone.status}
        </span>
        <span className="font-medium">{milestone.payment}</span>
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};
