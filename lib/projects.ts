import { join } from "path";

import { getDir, getSlugFromFileName, getFileNames, getItemInPath } from "./md";
import { Project } from "@/interfaces/Project";

const PROJECTS_DIR = getDir("/content/projects");

const getProjectsFileNames = () => getFileNames(PROJECTS_DIR);

const getProjectsSlugs = () => getProjectsFileNames().map(getSlugFromFileName);

// getNotes :: string -> Notes
const getProject = (fileName: string): Project => {
  const project = getItemInPath(join(PROJECTS_DIR, fileName)) as Project;

  project.slug = fileName.replace(/\.md$/, "");
  return project;
};

const getAllProjects = async (): Promise<Project[]> => {
  const allProjects = await Promise.all(
    getProjectsFileNames().map((projectFileName) => getProject(projectFileName))
  );

  return allProjects;
};

export { getProjectsSlugs, getAllProjects };
