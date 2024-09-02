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
import Link from "next/link"
import * as z from "zod"
import { useRouter } from "next/navigation"
import axios from "axios"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must not exceed 16 characters"),
});

export default function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      const response = await axios.post('/api/auth/v1/login',formData);
      console.log(response);
      // update user context



      router.push(`/dashboard`);
    }catch(error){
      if (error instanceof z.ZodError) {
        const errorArray = error.issues;
        console.log(errorArray[0].message);
        return;
      }
    }
  }

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
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input name="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <Button type="submit" className="hover:bg-green-300 hover:text-black">Login</Button>
          </div>
        </form>
        <Link className="flex mt-4 text-slate-500 hover:text-green-400" href="/auth/signup">Don't have an account? Signup</Link>
      </CardContent>
    </Card>
    </div>
    </>
  )
}
