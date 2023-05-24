import { getNotesSlugs, getNotesBySlug } from "@/lib/notes";
import SingleNotesPage from "./single-notes-page";

export function generateStaticParams() {
  const slugs = getNotesSlugs();
  return slugs.map((slug) => ({
    slug,
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

// horrible name
export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const notes = await getNotesBySlug(slug);

  return <SingleNotesPage slug={slug} notes={notes} />;
}
