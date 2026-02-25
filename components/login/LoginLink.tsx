"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginLink() {
  const [open, setOpen] = useState(false);

  const [student_id , setStudent_id] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        student_id,
        password
      });

      if (res.status === 200) {
        alert("Login Success");
        setOpen(false);
        router.push("/");
        router.refresh()
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("username or password incorrect");
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
                <div 
                  className="text-sm text-[#308DD5] hover:underline font-medium cursor-pointer"
                >
                  Login now
                </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle className="text-primary font-extrabold text-2xl">Log in</DialogTitle>
            <div className="flex">
              <DialogDescription className="text-[#7A7979] mr-1.5">
                New User ?
              </DialogDescription>
              <Link href="/register" className="text-sm text-[#308DD5] hover:underline" onClick={() => setOpen(false)}>Register now</Link>
            </div>
          </DialogHeader>
          <FieldGroup className="mt-3">
             <Field>
              <Label htmlFor="username" className="text-primary">StudentID</Label>
              <Input id="name-1" name="name" placeholder="StudentID" value={student_id} onChange={(e) => setStudent_id(e.target.value)}/>
            </Field>
           <Field>
              <Label htmlFor="password" className="text-primary">Password</Label>
              <Input id="username-1" name="username"  placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="w-full mt-7 cursor-pointer">Sign In</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}

