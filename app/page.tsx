import { getAllNotes } from "@/lib/notes";
import HomePage from "./home-page";

async function getAllData() {
  const notes = await getAllNotes();

  return notes;
}

export default async function Page() {
  const recentNotes = await getAllData();

  return <HomePage notes={recentNotes} />;
}
