"use client";

import Link from "next/link";
import Image from "next/image";

import { Footer, Header, Navbar } from "@/components/common";
import { NoteList } from "@/components/notes";

// TODO: add projects
const projects = [
  {
    slug: "needs-a-better-system-for-this",
    title: "",
    description: "",
    date: "",
    coverImage:
      "https://images.unsplash.com/photo-1503980850968-b7c3b4af0e05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80",
  },
];

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
              layout="fill"
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

          {/* Project List Starts */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {projects.map((project) => (
              <div key={project.slug} className="group relative">
                <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
                  <Image
                    layout="fill"
                    src={project.coverImage}
                    alt={""}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link href={`/projects/${project.slug}`}>
                    <span className="absolute inset-0" />
                    {project.title}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
          {/* Portfolio List Ends */}
        </div>
      </div>
      <Footer />
    </>
  );
}
