'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function FieldDemo() {
  return (
    <main className="flex justify-center">
      <div className="w-full max-w-md">
        <form>
          <FieldGroup>
            <FieldSet>
              <div className="text-primary font-extrabold text-2xl mt-10">Register</div>
              <div className="flex items-baseline gap-1.5 mb-2 -mt-4"> 
                <span className="text-sm text-[#7A7979]">
                  New User ?
                </span>
                <Link 
                  href="/register" 
                  className="text-sm text-[#308DD5] hover:underline font-medium"
                >
                  Register now
                </Link>
              </div>
              <FieldGroup>
                <div className="flex justify-between gap-10">
                  <Field>
                    <FieldLabel htmlFor="Fullname" className="text-primary">
                      Fullname
                    </FieldLabel>
                    <Input
                      id="Fullname"
                      placeholder="Fullname"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Surname" className="text-primary">
                      Surname
                    </FieldLabel>
                    <Input
                      id="Surname"
                      placeholder="Surname"
                      required
                    />
                  </Field>
                </div>
                <div className="flex justify-between gap-10">
                  <Field>
                    <FieldLabel htmlFor="Faculty" className="text-primary">
                      Faculty
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="Faculty">
                        <SelectValue placeholder="Faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="01">วิศวกรรมศาสตร์</SelectItem>
                          <SelectItem value="02">บัญชี</SelectItem>
                          <SelectItem value="03">อุตสาหกรรมเกษตร</SelectItem>
                          <SelectItem value="04">เศรษฐศาสตร์</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Department" className="text-primary">
                      Department
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="Department">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="01">คอมพิวเตอร์</SelectItem>
                          <SelectItem value="02">เครื่องกล</SelectItem>
                          <SelectItem value="03">อุตสาหกรรมเกษตร</SelectItem>
                          <SelectItem value="04">เศรษฐศาสตร์</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="StudentID" className="text-primary">
                      StudentID
                    </FieldLabel>
                    <Input
                      id="StudentID"
                      placeholder="StudentID"
                      type="Number"
                      required
                    />
                  </Field>
                </div>
                <div className="flex justify-between gap-10">
                  <Field>
                    <FieldLabel htmlFor="Username" className="text-primary">
                      Username
                    </FieldLabel>
                    <Input
                      id="Username"
                      placeholder="Username"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Password" className="text-primary">
                      Password
                    </FieldLabel>
                    <Input
                      id="Password"
                      placeholder="Password"
                      type="password"
                      required
                    />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Button type="submit" className="w-full cursor-pointer -mt-3">Register</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </main>
  )
}

