import { getNotesSlugs, getNotesBySlug } from "@/lib/notes";
import { PageLayout } from "@/components/layouts";
import { NoteHeader } from "@/components/notes";
import styles from "./markdown.module.css";

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
export default async function SingleNotesItem({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const notes = await getNotesBySlug(slug);

  // Add a CSS class to the container element
  const containerClassName = styles["markdown-body"];
  return (
    <>
      <PageLayout>
        <div className="m-auto w-2/3">
          <NoteHeader notes={notes} />
          <article className="prose lg:prose-lg markdown-image-50">
            {/* Notes Content Here */}
            <div
              className={containerClassName}
              dangerouslySetInnerHTML={{ __html: notes.content }}
            />
          </article>
        </div>
      </PageLayout>
    </>
  );
}
