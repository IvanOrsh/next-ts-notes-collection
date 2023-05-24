import { saveSearchData } from "@/lib/md";
import { getAllNotes } from "@/lib/notes";
import { getAllProjects } from "@/lib/projects";

import HomePage from "./home-page";

// TODO: refactor - it can blow up!
async function getAllData() {
  const notes = await getAllNotes();
  const projects = await getAllProjects();
  saveSearchData(notes);
  return { notes, projects };
}

export default async function Page() {
  const { notes, projects } = await getAllData();

  return <HomePage notes={notes} projects={projects} />;
}
