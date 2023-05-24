"use client";
import { PageLayout } from "@/components/layouts";
import ColorPickerProject from "@/components/projects/projectsCode/colorPickerApp/ColorPickerProject";

// This is a Client Component. It receives data as props and
// has access to state and effects
export default function ProjectPage() {
  return (
    <>
      <PageLayout>
        <ColorPickerProject />
      </PageLayout>
    </>
  );
}
