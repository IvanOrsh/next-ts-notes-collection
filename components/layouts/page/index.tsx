import { PropsWithChildren } from "react";

import { Navbar, Footer } from "@/components/common";

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="page-layout mx-auto max-w-7xl space-y-8 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative bg-white pb-8 lg:w-full lg:max-w-2xl">
          <Navbar />
        </div>
        <div className="mx-auto max-w-3xl px-4 lg:max-w-7xl">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
