"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLogout } from "@/state"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useDispatch } from "react-redux"

export function DropdownMenuDemo(props: { userName: string }) {
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-blue-700 hover:text-green-200 hover:cursor-pointer">{props.userName}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel><p className="">{props.userName}</p></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href="/dashboard">
              Dashboard
            </Link>
          </DropdownMenuItem>
         </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href="/dashboard/generate">
              New generation
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a className="w-full" href="https://www.github.com/anujshandillya/subtext">
            Github
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          signOut();
          dispatch(setLogout());
        }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function UserOpt(props: { userName: string }) {
  return (
    <>
    <DropdownMenuDemo userName={props.userName} />
    </>
  )
}
