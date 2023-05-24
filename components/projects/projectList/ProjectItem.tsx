import Link from "next/link";
import Image from "next/image";
import { Project } from "@/interfaces/Project";

type ProjectItemProps = {
  project: Project;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { slug, title, description, date, coverImage } = project;

  return (
    <div key={slug} className="group relative">
      <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
        <Image
          fill
          src={coverImage}
          alt={""}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <Link href={`/projects/${slug}`}>
          <span className="absolute inset-0" />
          {title}
        </Link>
      </h3>
      <p className="text-base font-semibold text-gray-900">{description}</p>
    </div>
  );
};

export default ProjectItem;
