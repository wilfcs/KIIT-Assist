"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="block w-full max-w-screen-xl px-4 py-3 mx-auto bg-white border border-white/80 shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased text-black"
        >
          KIIT-Assist
        </Link>
        <div className="flex items-center lg:hidden">
          <button
            className="p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}
        >
          <ul className="flex flex-col items-center gap-4 my-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:justify-between">
            <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                href="/"
                className="flex items-center transition-colors hover:text-blue-500 text-black"
              >
                Home
              </Link>
            </li>
            <li className="block p-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                href="/mlmodel"
                className="flex items-center transition-colors hover:text-blue-500 text-black"
              >
                ML Model
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;