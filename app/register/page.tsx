'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoginLink } from "@/components/login/LoginLink"
import { toast } from "sonner"
import {
  Field,
  FieldGroup,
  FieldLabel,
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

import {
  ArrowLeftIcon,
  UserPlus,
  GraduationCap
} from "lucide-react"

const FACULTIES_DATA: Record<string, string[]> = {
  "วิศวกรรมศาสตร์": [
    "วิศวกรรมคอมพิวเตอร์",
    "วิศวกรรมเครื่องกล",
    "วิศวกรรมไฟฟ้า",
    "วิศวกรรมโยธา",
    "วิศวกรรมอุตสาหการ",
    "วิศวกรรมเคมี",
    "วิศวกรรมสิ่งแวดล้อม",
    "วิศวกรรมการบินและอวกาศ"
  ],
  "วิทยาศาสตร์": [
    "วิทยาการคอมพิวเตอร์",
    "คณิตศาสตร์",
    "เคมี",
    "ฟิสิกส์",
    "ชีววิทยา",
    "สถิติ",
    "จุลชีววิทยา",
    "พันธุศาสตร์"
  ],
  "บริหารธุรกิจ": [
    "การบัญชี",
    "การเงิน",
    "การตลาด",
    "การจัดการ",
    "การจัดการการดำเนินงาน"
  ],
  "เศรษฐศาสตร์": [
    "เศรษฐศาสตร์",
    "เศรษฐศาสตร์เกษตรและทรัพยากร",
    "ธุรกิจการเกษตร"
  ],
  "อุตสาหกรรมเกษตร": [
    "วิทยาศาสตร์และเทคโนโลยีการอาหาร",
    "เทคโนโลยีชีวภาพ",
    "พัฒนาผลิตภัณฑ์",
    "เทคโนโลยีการบรรจุและวัสดุ",
    "อุตสาหกรรมเกษตร"
  ],
  "มนุษยศาสตร์": [
    "ภาษาอังกฤษ",
    "ภาษาไทย",
    "ภาษาญี่ปุ่น",
    "ภาษาจีน",
    "สื่อสารมวลชน",
    "ท่องเที่ยวและโรงแรม"
  ],
  "สังคมศาสตร์": [
    "จิตวิทยา",
    "นิติศาสตร์",
    "รัฐศาสตร์",
    "ภูมิศาสตร์",
    "สังคมวิทยาและมานุษยวิทยา"
  ],
  "เกษตร": [
    "กีฏวิทยา",
    "โรคพืช",
    "ปฐพีวิทยา",
    "พืชไร่นา",
    "พืชสวน",
    "สัตวบาล"
  ],
  "ศึกษาศาสตร์": [
    "การพัฒนาทรัพยากรมนุษย์",
    "พลศึกษา",
    "คณิตศาสตร์ศึกษา",
    "วิทยาศาสตร์ศึกษา"
  ],
  "วนศาสตร์": [
    "การจัดการป่าไม้",
    "ชีววิทยาป่าไม้",
    "วนวัฒนวิทยา",
    "วิศวกรรมป่าไม้"
  ],
  "ประมง": [
    "การจัดการประมง",
    "ชีววิทยาประมง",
    "เพาะเลี้ยงสัตว์น้ำ",
    "ผลิตภัณฑ์ประมง"
  ],
  "สถาปัตยกรรมศาสตร์": [
    "สถาปัตยกรรม",
    "ภูมิสถาปัตยกรรม",
    "นวัตกรรมการออกแบบผลิตภัณฑ์"
  ]
};

export default function FieldDemo() {
  const [fullname, setFullname] = useState("");
  const [surname, setSurname] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [student_id, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleFacultyChange = (value: string) => {
    setFaculty(value);
    setDepartment(""); // Reset department when faculty changes
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", {
        password,
        fullname,
        surname,
        student_id,
        faculty,
        department
      });

      if (res.status === 201) {
        toast("Register Success");

        router.push("/");
        router.refresh()
      }
      if (res.status === 400) {
        alert("StudentID already exist");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast("Error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,112,184,0.08)] overflow-hidden border border-slate-100">
          <div className="p-8 sm:p-12">
            <form onSubmit={handleRegister} className="space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/5 p-2 rounded-lg">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-primary uppercase">Register</h1>
                  </div>
                  <div className="flex items-center gap-1.5 pl-1">
                    <span className="text-sm font-medium text-[#7A7979]">
                      New User ?
                    </span>
                    <LoginLink />
                  </div>
                </div>
                <Link href="/">
                  <Button variant="outline" size="icon" aria-label="Go Back" className="rounded-lg w-10 h-10 border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                    <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="Fullname" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                      Fullname
                    </FieldLabel>
                    <Input
                      id="Fullname"
                      placeholder="First Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                      className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Surname" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                      Surname
                    </FieldLabel>
                    <Input
                      id="Surname"
                      placeholder="Last Name"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                      className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel htmlFor="Faculty" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                      Faculty
                    </FieldLabel>
                    <Select defaultValue="" onValueChange={handleFacultyChange} value={faculty}>
                      <SelectTrigger id="Faculty" className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium">
                        <SelectValue placeholder="Faculty" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-slate-200 shadow-xl max-h-[300px]">
                        <SelectGroup>
                          {Object.keys(FACULTIES_DATA).map((fac) => (
                            <SelectItem key={fac} value={fac} className="rounded-md my-1 cursor-pointer">{fac}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Department" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                      Department
                    </FieldLabel>
                    <Select
                      defaultValue=""
                      onValueChange={setDepartment}
                      value={department}
                      disabled={!faculty}
                    >
                      <SelectTrigger id="Department" className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium">
                        <SelectValue placeholder={faculty ? "Department" : "Select FacultyFirst"} />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-slate-200 shadow-xl max-h-[300px]">
                        <SelectGroup>
                          {faculty && FACULTIES_DATA[faculty]?.map((dept) => (
                            <SelectItem key={dept} value={dept} className="rounded-md my-1 cursor-pointer">{dept}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="StudentID" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                    Student ID
                  </FieldLabel>
                  <Input
                    id="StudentID"
                    placeholder="Enter your Student ID"
                    type="text"
                    inputMode="numeric"
                    value={student_id}
                    onChange={(e) => setStudentID(e.target.value.replace(/\D/g, ""))}
                    required
                    className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="Password" className="text-primary font-bold text-sm mb-2 block uppercase tracking-wider">
                    Password
                  </FieldLabel>
                  <Input
                    id="Password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-all text-base px-4 font-medium"
                  />
                </Field>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full py-7 text-lg font-bold rounded-lg bg-primary hover:bg-primary/90 cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(7,9,116,0.15)] hover:shadow-[0_15px_30px_rgba(7,9,116,0.25)] hover:-translate-y-1 active:translate-y-0 border-none">
                  <UserPlus className="w-6 h-6" />
                  CREATE ACCOUNT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

