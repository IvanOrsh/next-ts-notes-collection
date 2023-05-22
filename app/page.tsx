import Link from "next/link";

import { NoteList } from "@/components/notes";
import { ProjectList } from "@/components/projects";
import { BaseLayout } from "@/components/layouts";
import { getAllNotes } from "@/lib/notes";

export default async function Home() {
  const allNotes = await getAllNotes();

  return (
    <BaseLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Newest Notes
        <Link href="/notes" className="ml-1 text-sm text-indigo-600">
          (See All)
        </Link>
      </h2>
      <NoteList notes={allNotes} />
      <br></br>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Projects
        <Link href="/projects" className="ml-1 text-sm text-indigo-600">
          (See All)
        </Link>
      </h2>
      <ProjectList />
    </BaseLayout>
  );
}
