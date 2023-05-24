"use client";

import { Notes } from "@/interfaces/Notes";
import { PageLayout } from "@/components/layouts";
import { NoteList } from "@/components/notes";

type NotesPageProps = {
  notes: Notes[];
};

// This is a Client Component. It receives data as props and
// has access to state and effects
export default function AllNotesPage({ notes }: NotesPageProps) {
  return (
    <PageLayout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All Notes
      </h2>
      <NoteList notes={notes} />
    </PageLayout>
  );
}
