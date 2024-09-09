"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import UserOpt from "./UserOpt";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { user } = useSelector((state: any) => state);
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
          {user && (
            <>
            <UserOpt userName={user?.name ?? ""} />
            </>
          )}
          {!user && (
            <>
            <Link href="/auth/login">
              <Button
                className="bg-white hover:bg-green-300 text-black"
              >
                Login
              </Button>
            </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
