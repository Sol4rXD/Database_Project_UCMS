"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Check, ChevronsUpDown, AlertTriangle, Trash2, Search, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function DeleteClubPage() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("") // slug
    const [clubs, setClubs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [confirmText, setConfirmText] = useState("")

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get("/api/club")
                setClubs(response.data)
            } catch (error) {
                console.error("Failed to fetch clubs:", error)
                toast.error("Failed to load clubs")
            } finally {
                setLoading(false)
            }
        }
        fetchClubs()
    }, [])

    const handleDelete = async () => {
        if (!value) return
        if (confirmText !== "CONFIRM") {
            toast.error("Please type CONFIRM exactly to proceed")
            return
        }

        setIsDeleting(true)
        try {
            await axios.delete(`/api/club/${value}`)
            toast.success("Club deleted successfully")
            // Refresh list
            setClubs(clubs.filter(c => c.slug !== value))
            setValue("")
            setConfirmText("")
            router.refresh()
        } catch (error: any) {
            console.error("Deletion failed:", error)
            toast.error(error.response?.data?.error || "Failed to delete club")
        } finally {
            setIsDeleting(false)
        }
    }

    const selectedClub = clubs.find(c => c.slug === value)

    return (
        <div className="min-h-screen bg-[#fffafa] pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-muted-foreground hover:text-destructive transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                            Delete Club <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full uppercase tracking-wider font-bold">Danger Zone</span>
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm italic">Permanently remove a club and all its associated data from the system.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Warning Card */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-xl text-red-600">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-red-900 font-bold text-lg mb-1">Proceed with Caution</h3>
                            <p className="text-red-700 text-sm leading-relaxed">
                                Deleting a club is an <span className="underline font-bold">irreversible</span> action. This will immediately remove the club from the public directory and purge all its history.
                            </p>
                        </div>
                    </div>

                    {/* Deletion Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                <Trash2 className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Select Club to Delete</h2>
                        </div>
                        <div className="p-8 space-y-8">
                            {/* Choose Your Clubs */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-gray-700">Target Club</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            disabled={loading}
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between h-14 rounded-xl border-gray-200 font-normal px-4 hover:bg-gray-50 text-gray-700 flex items-center transition-all bg-white"
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                                                <span className="truncate">
                                                    {loading ? "Loading clubs..." : value
                                                        ? selectedClub?.club_name
                                                        : "Search clubs to delete..."}
                                                </span>
                                            </div>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl shadow-2xl border-gray-100 overflow-hidden" align="start">
                                        <Command className="rounded-xl">
                                            <CommandInput placeholder="Type club name..." className="h-12 border-none focus:ring-0" />
                                            <CommandList className="max-h-[300px]">
                                                <CommandEmpty className="py-6 text-center text-gray-500">No club found.</CommandEmpty>
                                                <CommandGroup>
                                                    {clubs.map((club) => (
                                                        <CommandItem
                                                            key={club.slug}
                                                            value={club.club_name}
                                                            onSelect={() => {
                                                                setValue(club.slug)
                                                                setOpen(false)
                                                            }}
                                                            className="rounded-lg mx-1 my-1 cursor-pointer py-3 hover:bg-red-50"
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4 text-red-600",
                                                                    value === club.slug ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            <span className="font-medium">{club.club_name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Confirmation */}
                            {value && (
                                <div className="space-y-4 pt-4 border-t border-gray-50 animate-in fade-in slide-in-from-top-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-600">You are about to delete:</p>
                                        <p className="text-xl font-bold text-red-600 mt-1">{selectedClub?.club_name}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="confirmation" className="text-sm font-bold text-gray-700 uppercase tracking-tight">Type "CONFIRM" to Proceed</Label>
                                        <Input
                                            id="confirmation"
                                            value={confirmText}
                                            onChange={(e) => setConfirmText(e.target.value)}
                                            placeholder="Type exactly CONFIRM"
                                            autoComplete="off"
                                            className="rounded-xl border-gray-200 focus-visible:ring-red-100 focus-visible:border-red-200 h-14 placeholder:text-gray-300 transition-all font-bold text-red-600"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-end pt-4 gap-4">
                        <Button
                            variant="ghost"
                            asChild
                            disabled={isDeleting}
                            className="rounded-xl px-8 h-12"
                        >
                            <Link href="/">Cancel</Link>
                        </Button>
                        <Button
                            onClick={handleDelete}
                            size="lg"
                            disabled={!value || confirmText !== "CONFIRM" || isDeleting}
                            className={cn(
                                "rounded-xl px-12 h-14 font-extrabold text-lg w-full sm:w-auto transition-all shadow-xl",
                                value && confirmText === "CONFIRM"
                                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                            )}
                        >
                            {isDeleting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Trash2 className="mr-2 h-5 w-5" />
                            )}
                            Delete Club Permanently
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
