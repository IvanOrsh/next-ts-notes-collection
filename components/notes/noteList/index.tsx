import Link from "next/link";
import Image from "next/image";

const notes = [
  {
    slug: "typescript-fundamentals",
    title: "TypeScript: Fundamentals",
    description:
      "Complete overview of TypeScript for both frontend and backend.",
    date: "2022-05-05",
    coverImage:
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    slug: "typescript-type-transformations",
    title: "TypeScript: Type Transformations",
    description:
      "These notes are covering such topics as: type inference, union and indexing, template literal, type helper patterns, conditional types and key mapping.",
    date: "2022-08-15",
    coverImage:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    slug: "javascript-functional-programming-1-fundamentals",
    title: "JavaScript - Functional Programming: Part One - Fundamentals",
    description:
      "These notes provide some theory and examples on introduction to functional programming in JavaScript. The following topics are covered: functions, higher-order functions, partial application and currying, working with data and stateless components.",
    date: "2023-02-15",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1678453147620-d4866d7562e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
];

const NoteList = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {notes.map((note) => (
        <div key={note.slug} className="group">
          <div className="aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
            <Link href={`/blogs/${note.slug}`}>
              <div className="aspect-w-1 aspect-h-1 lg:aspect-none relative h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
                <Image
                  priority
                  layout="fill"
                  objectFit="cover"
                  src={note.coverImage}
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
                {note.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{note.description}</p>
            </div>
          </div>
          <Link
            href={`/blogs/${note.slug}`}
            className="text-sm font-bold text-gray-700"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
