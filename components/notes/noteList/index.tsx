import { Notes } from "@/interfaces/Notes";
import NoteItem from "./NoteItem";

type NoteListProps = {
  notes: Notes[];
};

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {notes.map((note) => (
        <NoteItem key={note.slug} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
