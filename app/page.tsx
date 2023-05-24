import { saveSearchData } from "@/lib/md";
import { getAllNotes } from "@/lib/notes";
import HomePage from "./home-page";

// TODO: refactor - it can blow up!
async function getAllData() {
  const notes = await getAllNotes();
  saveSearchData(notes);
  return notes;
}

export default async function Page() {
  const recentNotes = await getAllData();

  return <HomePage notes={recentNotes} />;
}
