import React from "react";
import Link from "next/link";

interface Props {}

export const Header: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex py-2 rfs-px-16 bg-white shadow-md w-screen justify-center">
      <div className="flex w-full justify-between max-w-3xl">
        <Link href="/">
          <div className="flex w-24 ">
            <img className="w-full  my-2" src="/logo2.png" />
          </div>
        </Link>
        <div className="flex flex-row justify-items-end ">
          <nav className="px-3 my-auto">Je suis...</nav>
          <nav className="px-3 my-auto">
            <Link href="/blog">Blog</Link>
          </nav>
          {false && (
            <nav className="px-3 my-auto">
              <Link href="/services">Services</Link>
            </nav>
          )}
          <nav className="px-3 my-auto">
            <Link href="/cours">Newsletter</Link>
          </nav>
          { false && <><nav className="px-3 my-auto">
            <Link href="/cours">Cours</Link>
          </nav>
          <nav className="px-3 my-auto">
            <Link href="/livres">Livres</Link>
          </nav></>}
          <nav className="px-3 my-auto">
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
