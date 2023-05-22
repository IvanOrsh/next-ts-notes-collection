import { Notes } from "@/interfaces/Notes";
import { getAllNotes, getNotesBySlug } from "@/lib/notes";

export async function generateStaticParams() {
  const notes = await getAllNotes();

  return notes.map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { title } = await getNotesBySlug(slug);
  return {
    title,
  };
}

export default async function Notes({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { content, title, date } = await getNotesBySlug(slug);
  return (
    <article>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <div>{content}</div>
    </article>
  );
}
