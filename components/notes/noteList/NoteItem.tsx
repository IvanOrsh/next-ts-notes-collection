import Link from "next/link";
import Image from "next/image";
import { Notes } from "@/interfaces/Notes";
import { shortify } from "@/lib/cient/utils";

type NoteItemsProps = {
  note: Notes;
};

const NoteItem = ({ note }: NoteItemsProps) => {
  const { slug, title, description, date, coverImage } = note;

  return (
    <div key={slug} className="group">
      <div className="aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
        <Link href={`/notes/${slug}`}>
          <div className="aspect-w-1 aspect-h-1 lg:aspect-none relative h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
            <Image
              priority
              fill
              style={{ objectFit: "cover" }}
              src={coverImage}
              className="rounded-lg hover:cursor-pointer"
              alt={""}
            />
          </div>
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-700">
            <span aria-hidden="true" className="inset-0" />
            {shortify(title)}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{shortify(description)}</p>
        </div>
      </div>
      <Link href={`/notes/${slug}`} className="text-sm font-bold text-gray-700">
        Read More
      </Link>
    </div>
  );
};

export default NoteItem;
