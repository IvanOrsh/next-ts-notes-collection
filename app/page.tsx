import Link from "next/link";
import Image from "next/image";

import { Footer, Header, Navbar } from "@/components/common";
import { NoteList } from "@/components/notes";
import { ProjectList } from "@/components/projects";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <Navbar />
            <Header />
          </div>
          <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              priority
              fill
              alt=""
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Newest Notes
            <Link href="/notes" className="ml-1 text-sm text-indigo-600">
              (See All)
            </Link>
          </h2>
          <NoteList />
          <br></br>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Projects
            <Link href="/projects" className="ml-1 text-sm text-indigo-600">
              (See All)
            </Link>
          </h2>
          <ProjectList />
        </div>
      </div>
      <Footer />
    </>
  );
}
