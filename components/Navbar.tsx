import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white p-4 drop-shadow-md">
      <ul className="text-2xl font-bold text-[#070974] ml-4 cursor-pointer">
        <li>
          <Link href="/">
            UCMS
          </Link>
        </li>
      </ul>
      <div className="flex items-center">
        <ul className="flex gap-10 text-base font-medium text-[#070974] mr-10">
          <li>
            <Link href="/" className="hover:text-blue-500 transition-colors font-bold transition duration-200">ข่าวสาร</Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-500 transition-colors font-bold transition duration-200">รายชื่อชมรม</Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-500 transition-colors font-bold transition duration-200">ตารางกิจกรรม</Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-500 transition-colors font-bold transition duration-200">ค้นหาชมรมที่ใช่</Link>
          </li>
        </ul>
        <Button className="bg-[#070974] hover:bg-blue-500 text-white px-6 py-2 h-10 font-bold cursor-pointer transition duration-300">Sign In</Button>
      </div>
    </nav>
  )
}

