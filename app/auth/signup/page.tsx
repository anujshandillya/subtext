"use client"
import {
  useState
} from "react"

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
import * as z from "zod"
import Link from "next/link"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must not exceed 16 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["password","confirmPassword"],
})

export default function page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      // const response = await fetch('/api/auth/v1/signup', {})
      // console.log(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorArray = error.issues;
        console.log(errorArray[0].message);
        return;
      }
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

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
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <Button className="hover:bg-green-300 hover:text-black mt-4">Signup</Button>
          </div>
        </form>
        <Link className="flex mt-4 text-slate-500 hover:text-green-400" href="/auth/login">Already have an account? Login</Link>
      </CardContent>
    </Card>
    </div>
    </>
  )
}


// ZodError: [
//   {
//     "validation": "email",
//     "code": "invalid_string",
//     "message": "Invalid email address",
//     "path": [
//       "email"
//     ]
//   },
//   {
//     "code": "too_small",
//     "minimum": 8,
//     "type": "string",
//     "inclusive": true,
//     "exact": false,
//     "message": "Password must be at least 8 characters",
//     "path": [
//       "password"
//     ]
//   },
//   {
//     "code": "custom",
//     "message": "Passwords do not match",
//     "path": [
//       "password",
//       "confirmPassword"
//     ]
//   }
// ]