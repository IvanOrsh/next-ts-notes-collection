import { getProjectsSlugs } from "@/lib/projects";
import ProjectPage from "./project-page";

export function generateStaticParams() {
  const slugs = getProjectsSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <ProjectPage />;
}
