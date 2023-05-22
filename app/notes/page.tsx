import { NoteList } from "@/components/notes";
import { getAllNotes } from "@/lib/notes";
import { PageLayout } from "@/components/layouts";

export function generateMetadata() {
  return {
    title: "All Notes",
  };
}

export default async function AllNotes() {
  const notes = await getAllNotes();

  return (
    <PageLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All Notes
      </h2>
      <NoteList notes={notes} />
    </PageLayout>
  );
}
