"use client";

import { PageLayout } from "@/components/layouts";
import { NoteHeader } from "@/components/notes";
import { SideMenu } from "@/components/common";
import { Notes } from "@/interfaces/Notes";

import styles from "./markdown.module.css";

type SingleNotesPageProps = {
  slug: string;
  notes: Notes;
};

// This is a Client Component. It receives data as props and
// has access to state and effects
export default function SingleNotesPage({ slug, notes }: SingleNotesPageProps) {
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
