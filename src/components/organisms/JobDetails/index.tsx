import { useParams } from "react-router-dom";
import { User, Calendar, Clock, X } from "lucide-react";
import { useJobDetails } from "@/shared/hooks";
import { useNavigation } from "@/shared/hooks/ui";
import { Button } from "@/shared/ui";
import { Card, CardContent } from "@/shared/ui/Card";

interface JobDetailsProps {
 onClose?: () => void;
}

export const JobDetails = ({ onClose }: JobDetailsProps) => {
 const { goToMessages, goBack } = useNavigation();
 const { jobId } = useParams();
 const { job, isLoading, error } = useJobDetails(jobId);

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
     <Button onClick={goBack}>Go Back</Button>
    </div>
   </div>
  );
 }

 return (
  <div className="space-y-8">
   <div className="flex items-start justify-between">
    <div>
     <h2 className="text-heading-2 mb-2">{job.title}</h2>
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
     <Button onClick={onClose} variant="ghost" size="icon">
      <X className="h-4 w-4" />
     </Button>
    )}
   </div>

   <Card>
    <CardContent className="p-6 space-y-6">
     <div>
      <h3 className="text-heading-4 mb-2">Job Details</h3>
      <p className="text-body-md text-muted-foreground">{job.description}</p>
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
       <span className="text-label-md text-muted-foreground">Progress</span>
       <span className="text-label-md">{job.progress}%</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
       <div
        className="h-full bg-primary rounded-full transition-all duration-300"
        style={{ width: `${job.progress}%` }}
       ></div>
      </div>
     </div>
    </CardContent>
   </Card>

   <Card>
    <CardContent className="p-6">
     <div className="flex items-center gap-3 border-b pb-4 mb-4">
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
       <User className="h-5 w-5" />
      </div>
      <div>
       <p className="font-medium">{job.freelancer.name}</p>
       <p className="text-body-sm text-muted-foreground">
        {job.freelancer.role}
       </p>
      </div>
      <Button
       onClick={() => goToMessages(job.freelancer.id)}
       className="ml-auto"
      >
       Message
      </Button>
     </div>
    </CardContent>
   </Card>
  </div>
 );
};
