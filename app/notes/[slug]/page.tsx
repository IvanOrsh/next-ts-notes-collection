import { getNotesSlugs, getNotesBySlug } from "@/lib/notes";
import { PageLayout } from "@/components/layouts";
import { NoteHeader } from "@/components/notes";
import styles from "./markdown.module.css";
import { SideMenu } from "@/components/common";

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
        <NoteHeader notes={notes} />
        <div className="mx-auto flex">
          {notes.tableOfContents && (
            <SideMenu slug={slug} menuItems={notes.tableOfContents} />
          )}
          <div className="w-2/3 flex-grow p-4">
            <div
              className={containerClassName}
              dangerouslySetInnerHTML={{ __html: notes.content }}
            />
          </div>
        </div>
      </PageLayout>
    </>
  );
}
