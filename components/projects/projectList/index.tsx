import ProjectItem from "./ProjectItem";

// TODO: add projects
const projects = [
  {
    slug: "needs-a-better-system-for-this",
    title: "",
    description: "",
    date: "",
    coverImage:
      "https://images.unsplash.com/photo-1503980850968-b7c3b4af0e05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80",
  },
];

const ProjectList = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
