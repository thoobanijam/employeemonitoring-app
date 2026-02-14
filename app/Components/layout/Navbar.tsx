'use client'

import React from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#eaf2fc] border-b border-[#dee9f7]">
      <div
        className="
        flex flex-row items-center justify-between
        px-3 sm:px-6 md:px-12 lg:px-24
        py-4
        overflow-x-auto
        whitespace-nowrap
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <img
            src="/img/Screenshot.png"
            alt="Logo"
            className="
              h-8 w-8
              sm:h-9 sm:w-9
              md:h-11 md:w-11
              lg:h-12 lg:w-12
              transition-transform duration-300 hover:scale-110
            "
          />
          <h1 className="
            font-semibold
            text-[13px]
            sm:text-[15px]
            md:text-[20px]
            lg:text-[26px]
          ">
            <span className="text-[#1e426d] font-bold">EMPLOYEE</span>{" "}
            <span className="text-[#1e426d]">MONITORING SYSTEM</span>
          </h1>
        </div>

        {/* Menu */}
        <div
          className="
          flex flex-row items-center
          gap-3 sm:gap-4 md:gap-6
          text-[#1e426d]
          text-[12px] sm:text-[14px] md:text-[16px] lg:text-lg
          font-semibold
          flex-shrink-0
          "
        >
          <Link href="/admin/loginadmin"
           className="inline-flex items-center gap-1">
            Features <MdKeyboardArrowDown />
          </Link>

          <Link href="/hr/hrlogin" 
          className="inline-flex items-center gap-1">
            How It Works <MdKeyboardArrowDown />
          </Link>

          <Link href="/employee/employee-login" 
          className="inline-flex items-center gap-1">
            Pricing <MdKeyboardArrowDown />
          </Link>

          <button
            className="
            bg-[#2766c5]
            px-3 sm:px-4 md:px-5 lg:px-6
            py-1.5 sm:py-2 md:py-2.5
            text-white
            rounded-3xl
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
