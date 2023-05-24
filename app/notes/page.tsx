import { getAllNotes } from "@/lib/notes";

import AllNotesPage from "./all-notes-page";

export function generateMetadata() {
  return {
    title: "All Notes",
  };
}

export default async function Page() {
  const notes = await getAllNotes();

  return <AllNotesPage notes={notes} />;
}
