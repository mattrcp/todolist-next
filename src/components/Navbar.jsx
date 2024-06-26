import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-slate-800">
      <Link className="font-bold text-white" href={"/"}>
        GT Coding
      </Link>
      <Link className="p-2 bg-white" href={"/addTopic"}>
        Add topic
      </Link>
    </nav>
  );
};

export default Navbar;
