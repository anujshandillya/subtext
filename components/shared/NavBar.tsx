"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import UserOpt from "./UserOpt";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { user } = useSelector((state: any) => state);
  return (
    <div className="w-full backdrop-blur-md z-50 fixed mx-auto h-16 px-8 flex justify-around items-center">
      <Link className="text-2xl font-bold" href="/">
        SubText
      </Link>
      <nav className="flex gap-10 justify-normal items-center">
        <Link className="font-bold font-mono text-xl" href="/">Home</Link>
        <Link className="font-bold font-mono text-xl" href="/pricing">Pricing</Link>
        <Link className="font-bold font-mono text-xl" href="/contact">Contact</Link>
        {user && (
          <>
            <UserOpt userName={user?.name ?? ""} />
          </>
        )}
        {!user && (
          <Link href="/auth/login">
            <Button className="px-4 text-md bg-[#9085ff] hover:bg-[#8345ff]" size={"lg"}>Login</Button>
          </Link>
        )}
      </nav>
    </div>
  );
}
