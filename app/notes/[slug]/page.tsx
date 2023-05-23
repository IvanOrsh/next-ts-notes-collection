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

  console.log(notes.tableOfContents);

  // Add a CSS class to the container element
  const containerClassName = styles["markdown-body"];
  return (
    <>
      <PageLayout>
        <NoteHeader notes={notes} />
        <div className="m-auto flex">
          {notes.tableOfContents && (
            <SideMenu slug={slug} menuItems={notes.tableOfContents} />
          )}
          <div className="flex-1 p-4">
            <article className="prose lg:prose-lg markdown-image-50">
              {/* Notes Content Here */}
              <div
                className={containerClassName}
                dangerouslySetInnerHTML={{ __html: notes.content }}
              />
            </article>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
