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

export default function page() {
  return (
    <>
    <div className='container flex flex-row justify-around h-screen items-center'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Signup for an account</CardTitle>
        <div className="flex justify-around items-center">
        <Button className="rounded-full m-4 hover:bg-green-300 hover:text-black" onClick={()=>signIn()}><FcGoogle/></Button>
        </div>
        <span className="flex m-4 justify-around items-center">OR</span>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" placeholder="Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input name="username" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input name="password" type="password" placeholder="Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input name="confirmpassword" type="password" placeholder="Confirm Password" />
            </div>
            <Button className="hover:bg-green-300 hover:text-black mt-4">Signup</Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
    </>
  )
}
