"use client";

import type * as next from "next";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Footer, Header } from "@/components/common";

const navigation = [
  {
    name: "Notes",
    href: "/notes",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];

const notes = [
  {
    slug: "typescript-fundamentals",
    title: "TypeScript: Fundamentals",
    description:
      "Complete overview of TypeScript for both frontend and backend.",
    date: "2022-05-05",
    coverImage:
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    slug: "typescript-type-transformations",
    title: "TypeScript: Type Transformations",
    description:
      "These notes are covering such topics as: type inference, union and indexing, template literal, type helper patterns, conditional types and key mapping.",
    date: "2022-08-15",
    coverImage:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    slug: "javascript-functional-programming-1-fundamentals",
    title: "JavaScript - Functional Programming: Part One - Fundamentals",
    description:
      "These notes provide some theory and examples on introduction to functional programming in JavaScript. The following topics are covered: functions, higher-order functions, partial application and currying, working with data and stateless components.",
    date: "2023-02-15",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1678453147620-d4866d7562e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  },
];

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

// TODO: fix path
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 576 512" {...props}>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            {/* Navbar Starts */}
            <>
              <svg
                className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              {/* NAVIGATION START */}
              <Popover>
                <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                  <nav
                    className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                    aria-label="Global"
                  >
                    <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                      <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/">
                          <span className="sr-only">Your Company</span>
                          <Image
                            width={30}
                            height={30}
                            alt="Your Company"
                            className="h-8 w-auto sm:h-10"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          />
                        </Link>
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="font-medium text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="hidden md:block">
                      {/* Search Input Component */}
                    </div>
                  </nav>
                </div>

                <Transition
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                  >
                    <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                      <div className="flex items-center justify-between px-5 pt-4">
                        <div>
                          <Image
                            height={20}
                            width={20}
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="px-4">{/* Search Input Component */}</div>
                      <Link
                        href="#"
                        className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
                      >
                        Log in
                      </Link>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              {/* NAVIGATION END */}
            </>
            {/* Navbar Ends */}

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
            <Link href="/blogs" className="ml-1 text-sm text-indigo-600">
              (See All)
            </Link>
          </h2>

          {/* Notes List Starts */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {notes.map((note) => (
              <div key={note.slug} className="group">
                <div className="aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
                  <Link href={`/blogs/${note.slug}`}>
                    <div className="aspect-w-1 aspect-h-1 lg:aspect-none relative h-80 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
                      <Image
                        priority
                        layout="fill"
                        objectFit="cover"
                        src={note.coverImage}
                        className="rounded-lg hover:cursor-pointer"
                        alt={""}
                      />
                    </div>
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      <span aria-hidden="true" className="inset-0" />
                      {note.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {note.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/blogs/${note.slug}`}
                  className="text-sm font-bold text-gray-700"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
          {/* Notes List Ends */}

          <br></br>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Projects
            <Link href="/portfolios" className="ml-1 text-sm text-indigo-600">
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
                  <Link href={`/portfolios/${project.slug}`}>
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
