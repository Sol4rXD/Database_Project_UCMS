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
  ArrowLeftIcon
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
    <main className="flex justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <FieldSet>
              <div className="flex justify-between items-center">
                <div className="text-primary font-extrabold text-2xl mt-10">Register</div>
                <Link href="/" className="-mb-17">
                  <Button variant="outline" size="icon" aria-label="Go Back" className="cursor-pointer">
                    <ArrowLeftIcon className="cursor-pointer" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-baseline gap-1.5 mb-2 -mt-4">
                <span className="text-sm text-[#7A7979]">
                  New User ?
                </span>
                <LoginLink />
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
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
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
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </Field>
                </div>
                <div className="flex justify-between gap-10">
                  <Field>
                    <FieldLabel htmlFor="Faculty" className="text-primary">
                      Faculty
                    </FieldLabel>
                    <Select defaultValue="" onValueChange={handleFacultyChange} value={faculty}>
                      <SelectTrigger id="Faculty">
                        <SelectValue placeholder="Faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(FACULTIES_DATA).map((fac) => (
                            <SelectItem key={fac} value={fac}>{fac}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Department" className="text-primary">
                      Department
                    </FieldLabel>
                    <Select
                      defaultValue=""
                      onValueChange={setDepartment}
                      value={department}
                      disabled={!faculty}
                    >
                      <SelectTrigger id="Department">
                        <SelectValue placeholder={faculty ? "Department" : "Select Faculty First"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {faculty && FACULTIES_DATA[faculty]?.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
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
                      value={student_id}
                      onChange={(e) => setStudentID(e.target.value)}
                      required
                    />
                  </Field>
                </div>
                <div className="flex justify-between gap-10">
                  <Field>
                    <FieldLabel htmlFor="Password" className="text-primary">
                      Password
                    </FieldLabel>
                    <Input
                      id="Password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

