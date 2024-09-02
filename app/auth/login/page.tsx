"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FcGoogle from "@/components/shared/GoogleIcon"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function page() {
  return (
    <>
    <div className='container flex flex-row justify-around h-screen items-center'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <div className="flex justify-around items-center">
        <Button className="rounded-full m-4 hover:bg-green-300 hover:text-black" onClick={()=>signIn()}><FcGoogle/></Button>
        </div>
        <span className="flex m-4 justify-around items-center">OR</span>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input name="email" placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input name="password" placeholder="Password" />
            </div>
            <Button className="hover:bg-green-300 hover:text-black">Login</Button>
          </div>
        </form>
        <Link className="flex mt-4 text-slate-500 hover:text-green-400" href="/auth/signup">Don't have an account? Signup</Link>
      </CardContent>
    </Card>
    </div>
    </>
  )
}
