"use client";

import Link from "next/link";
import { LoginModal } from "./login/LoginModal";
import { useState, useEffect } from "react";
import { UserCircleIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.reload(); 
  };

return (
    <nav className="flex justify-between items-center bg-white p-4 drop-shadow-md fixed top-0 left-0 w-full z-50">
      <ul className="text-2xl font-bold text-primary ml-4 cursor-pointer">
        <li><Link href="/">UCMS</Link></li>
      </ul>
      
      <div className="flex items-center">
        <ul className="flex gap-10 text-base font-medium text-black mr-10">
          <li><Link href="/" className="hover:text-blue-500 font-bold transition duration-200">ข่าวสาร</Link></li>
          <li><Link href="/" className="hover:text-blue-500 font-bold transition duration-200">รายชื่อชมรม</Link></li>
          <li><Link href="/" className="hover:text-blue-500 font-bold transition duration-200">ตารางกิจกรรม</Link></li>
          <li><Link href="/" className="hover:text-blue-500 font-bold transition duration-200">ค้นหาชมรมที่ใช่</Link></li>
        </ul>

        {!mounted ? (
          <div className="w-[100px] h-9"></div> 
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-200">
                <span className="text-sm font-bold text-primary">{user.fullname}</span>
                <UserCircleIcon className="w-9 h-9 text-primary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">โปรไฟล์</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-500 focus:text-red-500 cursor-pointer"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>ออกจากระบบ</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginModal /> 
        )}
      </div>
    </nav>
  );
}
