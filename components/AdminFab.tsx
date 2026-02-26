"use client"

import React from "react"
import { Plus, Trash2, Pencil, ShieldCheck } from "lucide-react"
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

export function AdminFab() {
    return (
        <div className="fixed bottom-8 right-8 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 transition-all duration-300 transform hover:scale-110 active:scale-95 border-none group"
                    >
                        <Plus className="h-8 w-8 text-white transition-transform duration-300 group-data-[state=open]:rotate-45" />
                        <span className="sr-only">Admin Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 mb-4 p-2 rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-md">
                    <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2 text-indigo-900">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="font-semibold text-sm">ผู้ดูเเลระบบ (Admin)</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-indigo-100" />

                    <DropdownMenuItem asChild className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-indigo-50 transition-colors group">
                        <Link href="/addclub">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                            </div>
                            <span className="font-medium">เพิ่มชมรม</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-indigo-50 transition-colors group">
                        <Link href="/editclub">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Pencil className="w-4 h-4" />
                            </div>
                            <span className="font-medium">เเก้ไขชมรม</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-rose-50 transition-colors group">
                        <Link href="/deleteclub">
                            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-rose-600 group-hover:text-rose-700">ลบชมรม</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
