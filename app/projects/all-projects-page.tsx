"use client";

import { Project } from "@/interfaces/Project";
import { PageLayout } from "@/components/layouts";
import { ProjectList } from "@/components/projects";

type AllProjectsPageProps = {
  projects: Project[];
};

// This is a Client Component. It receives data as props and
// has access to state and effects
export default function AllProjectsPage({ projects }: AllProjectsPageProps) {
  return (
    <PageLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All Notes
      </h2>
      <ProjectList projects={projects} />
    </PageLayout>
  );
}
