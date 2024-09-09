"use client"
import {
  useEffect,
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
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import * as z from "zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import { setLogin } from "@/state"
import { useDispatch, useSelector } from "react-redux"

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
  const dispatch = useDispatch();
  const session = useSession();
  const { user } = useSelector((state: any) => state);
  console.log(user);
  if (user) {
    router.replace('/dashboard');
  }
  useEffect(() => {
    dispatch(setLogin({
      user: session?.data?.user,
      token: session.data?.user?.email
    }))
  }, [session]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      axios.post('/api/auth/v1/login', formData).then((res) => {
        if (res.status === 400) {
          throw new Error('Invalid Credentials');
        }
        console.log(res);
        // update user context
        dispatch(setLogin({
          user: {
            email: res.data?.userDetails.email ?? '',
            name: res.data?.userDetails.name ?? '',
            auth: res.data?.userDetails.auth ?? ''
          }
        }))
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorArray = error.issues;
        console.log(errorArray[0].message);
        // get toast
        return;
      }else {
        // get toast
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
              <Button className="rounded-full m-4 hover:bg-green-300 hover:text-black" onClick={() => {
                signIn();
                // set redux state
                dispatch(setLogin({
                  user: {
                    email: session.data!.user!.email,
                    name: session.data!.user!.name,
                    auth: session!.status === "authenticated" ? true : false,
                  }
                }))
              }}><FcGoogle /></Button>
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
