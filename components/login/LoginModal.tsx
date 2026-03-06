"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAuth } from "@/components/AuthProvider"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn } from "lucide-react"
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

export function LoginModal() {
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter(); // router might not be initialized, let's check imports

  const [student_id, setStudent_id] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        student_id,
        password
      });

      if (res.status === 200) {
        login(res.data.user);
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("username or password incorrect");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 h-auto font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 border-none">
          <LogIn className="w-4 h-4" />
          Sign In
        </Button>
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
          <FieldGroup className="mt-6">
            <Field>
              <Label htmlFor="username" className="text-primary">StudentID</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="StudentID"
                inputMode="numeric"
                value={student_id}
                onChange={(e) => setStudent_id(e.target.value.replace(/\D/g, ""))}
              />
            </Field>
            <Field>
              <Label htmlFor="password" className="text-primary">Password</Label>
              <Input id="username-1" name="username" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="w-full mt-7 py-6 text-base font-bold rounded-lg bg-primary hover:bg-primary/90 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

