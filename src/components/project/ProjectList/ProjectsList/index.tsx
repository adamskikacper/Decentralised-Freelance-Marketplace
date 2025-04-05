import React from "react";
import { JobSummary } from "@/types";
import ProjectCard from "../../ProjectCard/ProjectCard";

interface ProjectsListProps {
 jobs: JobSummary[];
 onMessage?: (userId: string) => void;
 onDetails?: (jobId: string) => void;
 showCreationDate?: boolean;
 title?: string;
 showViewAll?: boolean;
 onViewAll?: () => void;
 className?: string;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
 jobs,
 onMessage,
 onDetails,
 showCreationDate = false,
 title,
 showViewAll = false,
 onViewAll,
 className = "",
}) => {
 return (
  <div className={`slide-in ${className}`} style={{ animationDelay: "0.5s" }}>
   {(title || showViewAll) && (
    <div className="flex justify-between items-center mb-6">
     {title && <h2 className="text-xl font-bold">{title}</h2>}
     {showViewAll && (
      <button className="text-sm text-primary font-medium" onClick={onViewAll}>
       View all
      </button>
     )}
    </div>
   )}

   <div className="space-y-4">
    {jobs.map((job) => (
     <ProjectCard
      key={job.id}
      job={job}
      onMessage={onMessage}
      onDetails={onDetails}
      showCreationDate={showCreationDate}
     />
    ))}
   </div>
  </div>
 );
};

export default ProjectsList;
