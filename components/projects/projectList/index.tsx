import { Project } from "@/interfaces/Project";
import ProjectItem from "./ProjectItem";

type ProjectListProps = {
  projects: Project[];
};

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
