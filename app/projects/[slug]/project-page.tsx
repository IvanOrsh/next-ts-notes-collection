"use client";
import { PageLayout } from "@/components/layouts";
import ColorPickerApplication from "@/components/projects/projectsCode/color-picker-app/ColorPickerApplication";

// This is a Client Component. It receives data as props and
// has access to state and effects
export default function ProjectPage() {
  return (
    <>
      <PageLayout>
        <ColorPickerApplication />
      </PageLayout>
    </>
  );
}
