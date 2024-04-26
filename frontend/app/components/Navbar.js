"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="block w-full max-w-screen-xl px-6 py-3 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          href="/"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased text-black"
        >
          KIIT-Assist
        </Link>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                href="/"
                className="flex items-center transition-colors hover:text-blue-500 text-black"
              >
                Home
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
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
