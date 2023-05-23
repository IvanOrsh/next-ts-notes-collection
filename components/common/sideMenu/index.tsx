"use client";
import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SideMenuItem from "./SideMenuItem";
import { TableOfContentsItem } from "@/interfaces/TableOfContentsItem";

type SideMenuProps = {
  slug: string;
  menuItems: TableOfContentsItem[];
};

const SideMenu = ({ slug, menuItems }: SideMenuProps) => {
  return (
    <Popover>
      <aside className="sticky top-0 h-screen overflow-y-auto bg-gray-100 p-4">
        <div className="flex w-full items-center justify-between md:w-auto">
          <div className="-mr-2 flex items-center md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open table of contents</span>
              <QuestionMarkCircleIcon className="h-8 w-8" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
        <ul className="hidden md:block">
          {menuItems.map((menuItem) => (
            <SideMenuItem
              key={menuItem.title}
              anchor={`/notes/${slug}#${menuItem.anchor}`}
              level={menuItem.level}
              title={menuItem.title}
            />
          ))}
        </ul>
      </aside>

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
          {({ close }) => (
            <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close table of contents</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </Popover.Button>
                  <ul className="p-4">
                    {menuItems.map((menuItem) => (
                      <SideMenuItem
                        onClick={() => {
                          close();
                        }}
                        key={menuItem.title}
                        anchor={`/notes/${slug}#${menuItem.anchor}`}
                        level={menuItem.level}
                        title={menuItem.title}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SideMenu;
