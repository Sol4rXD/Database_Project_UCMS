"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant="outline" size="icon" className="w-9 h-9 opacity-0"></Button>
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full relative overflow-hidden group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 group-hover:text-amber-500 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 group-hover:text-indigo-400 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                    <Moon className="h-4 w-4 text-indigo-400" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                    <span className="h-4 w-4 flex items-center justify-center font-bold text-[10px] bg-slate-100 dark:bg-slate-800 rounded">SYS</span> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
