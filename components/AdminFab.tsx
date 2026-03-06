"use client"

import React from "react"
import { Plus, Trash2, Pencil, ShieldCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function AdminFab() {
    const [user, setUser] = React.useState<any>(null)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    if (!mounted || !user || user.role !== "ADMIN") {
        return null
    }

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        className="h-16 w-16 rounded-full shadow-[0_10px_40px_rgba(7,9,116,0.25)] bg-gradient-to-br from-[#070974] to-blue-900 hover:from-blue-900 hover:to-[#070974] transition-all duration-500 transform hover:scale-110 active:scale-95 border-none group relative overflow-hidden ring-4 ring-white/10 hover:ring-white/20"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

                        {/* Floating Admin Label on Hover */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#070974] text-white text-[10px] font-bold py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-wider shadow-lg">
                            Admin Menu
                        </div>

                        <Plus className="h-8 w-8 text-white transition-transform duration-500 group-data-[state=open]:rotate-[135deg] relative z-10" />
                        <span className="sr-only">Admin Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-64 mb-6 p-2 rounded-2xl border-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <DropdownMenuLabel className="flex items-center gap-3 px-3 py-3 text-[#070974]">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm leading-none">ผู้ดูเเลระบบ</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Administrator</span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100 mx-2" />

                    <div className="grid gap-1 mt-1">
                        <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                            <Link href="/addclub" className="flex items-center justify-between gap-3 p-3 cursor-pointer rounded-xl hover:bg-gray-50 transition-all group mx-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-gray-700">เพิ่มชมรม</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                            <Link href="/editclub" className="flex items-center justify-between gap-3 p-3 cursor-pointer rounded-xl hover:bg-gray-50 transition-all group mx-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                        <Pencil className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-gray-700">เเก้ไขชมรม</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                            <Link href="/deleteclub" className="flex items-center justify-between gap-3 p-3 cursor-pointer rounded-xl hover:bg-red-50 transition-all group mx-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-red-600">ลบชมรม</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-red-300 group-hover:text-red-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
