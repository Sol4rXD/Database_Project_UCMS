"use client";

import { useState } from "react"
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

export function LoginModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#070974] hover:bg-blue-500 text-white px-6 py-2 h-10 font-bold cursor-pointer transition duration-300">Sign In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
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
              <Label htmlFor="username" className="text-primary">Username</Label>
              <Input id="name-1" name="name" placeholder="Username"/>
            </Field>
            <Field>
              <Label htmlFor="password" className="text-primary">Password</Label>
              <Input id="username-1" name="username"  placeholder="Password"/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="w-full mt-2 cursor-pointer">Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

