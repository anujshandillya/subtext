"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import UserOpt from "./UserOpt";
import Image from "next/image";

export default function NavBar() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <div className="w-full bg-gray-800 text-white mx-auto h-16 px-8 flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">
          SubText
        </Link>
        <nav className="flex gap-6 justify-normal items-center">
          <Link className="hover:text-green-300" href="/">
            Home
          </Link>
          <Link className="hover:text-green-300" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-green-300" href="/contact">
            Contact
          </Link>
          {session.data?.user && (
            <>
            <UserOpt userName={session.data.user.name ?? ""} />
            </>
          )}
          {!session.data?.user && (
            <>
              <Button
                className="bg-white hover:bg-green-300 text-black"
                onClick={() => signIn()}
              >
                Login
              </Button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
