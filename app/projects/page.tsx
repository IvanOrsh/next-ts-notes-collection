import { getAllProjects } from "@/lib/projects";
import AllProjectsPage from "./all-projects-page";

export function generateMetadata() {
  return {
    title: "All Projects",
  };
}

export default async function Page() {
  const projects = await getAllProjects();

  return <AllProjectsPage projects={projects} />;
}
