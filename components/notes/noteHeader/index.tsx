/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import { Notes } from "@/interfaces/Notes";

type NoteHeaderProps = {
  notes: Notes;
};

const NoteHeader = ({ notes }: NoteHeaderProps) => {
  const { author, authorImage, date, title, description, coverImage } = notes;

  return (
    <div className="blog-detail-header">
      <div className="mb-2 flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <span className="sr-only">{author}</span>
              <div className="relative !mb-0 h-10 w-10">
                <Image
                  priority
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  src={authorImage}
                  alt=""
                />
              </div>
            </a>
          </div>
          <div className="ml-3">
            <p className="!mb-0 text-sm font-medium text-gray-900">
              <a href="#" className="hover:underline">
                {author}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={date}>{date}</time>
            </div>
          </div>
        </div>
        <div className="flex self-end">{/* Social Links Here */}</div>
      </div>
      <h1 className="mb-1 text-4xl font-bold">{title}</h1>
      <h2 className="blog-detail-header-subtitle mb-2 text-xl text-gray-600">
        {description}
      </h2>
      <div className="relative mx-auto h-96 w-full bg-black">
        <Image
          priority
          fill
          style={{ objectFit: "cover" }}
          src={coverImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default NoteHeader;
