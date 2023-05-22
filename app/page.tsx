import Link from "next/link";

import { NoteList } from "@/components/notes";
import { ProjectList } from "@/components/projects";
import { BaseLayout } from "@/components/layouts";

export default function Home() {
  return (
    <BaseLayout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Newest Notes
          <Link href="/notes" className="ml-1 text-sm text-indigo-600">
            (See All)
          </Link>
        </h2>
        <NoteList />
        <br></br>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Projects
          <Link href="/projects" className="ml-1 text-sm text-indigo-600">
            (See All)
          </Link>
        </h2>
        <ProjectList />
      </div>
    </BaseLayout>
  );
}
