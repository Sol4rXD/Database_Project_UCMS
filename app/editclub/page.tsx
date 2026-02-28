"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, SlidersHorizontal, Check, ChevronsUpDown, Trophy, Phone, FileText, MapPin, User, Globe, ArrowLeft, Save, Calendar, Activity, Search, Loader2, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function EditClubPage() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("") // Selected club slug
    const [clubs, setClubs] = useState<any[]>([])
    const [loadingClubs, setLoadingClubs] = useState(true)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        club_name: "",
        logo_url: "",
        cover_image: "",
        club_category: "",
        location: "",
        google_map_link: "",
        description: {
            short: "",
            full: ""
        },
        is_open: true,
        contact: [] as any[],
    })

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get("/api/club")
                setClubs(response.data)
            } catch (error) {
                console.error("Failed to fetch clubs:", error)
                toast.error("Failed to load clubs list")
            } finally {
                setLoadingClubs(false)
            }
        }
        fetchClubs()
    }, [])

    useEffect(() => {
        if (!value) return

        const fetchClubDetails = async () => {
            setLoadingDetails(true)
            try {
                const response = await axios.get(`/api/club/${value}`)
                const data = response.data
                setFormData({
                    club_name: data.club_name || "",
                    logo_url: data.logo_url || "",
                    cover_image: data.cover_image || "",
                    club_category: data.club_category || "",
                    location: data.location || "",
                    google_map_link: data.google_map_link || "",
                    description: {
                        short: data.description?.short || "",
                        full: data.description?.full || ""
                    },
                    is_open: data.is_open !== undefined ? data.is_open : true,
                    contact: data.contact || [],
                })
            } catch (error) {
                console.error("Failed to fetch club details:", error)
                toast.error("Failed to load club information")
            } finally {
                setLoadingDetails(false)
            }
        }
        fetchClubDetails()
    }, [value])

    const handleUpdate = async () => {
        if (!value) return

        setIsUpdating(true)
        try {
            const response = await axios.put(`/api/club/${value}`, formData)
            toast.success("Club updated successfully!")
            // Refresh clubs list in case the name changed
            const updatedClubs = await axios.get("/api/club")
            setClubs(updatedClubs.data)
        } catch (error) {
            console.error("Update failed:", error)
            toast.error("Failed to save changes")
        } finally {
            setIsUpdating(false)
        }
    }

    const addContact = () => {
        setFormData({
            ...formData,
            contact: [...formData.contact, { platform: "", link: "" }]
        })
    }

    const removeContact = (index: number) => {
        const newData = [...formData.contact]
        newData.splice(index, 1)
        setFormData({ ...formData, contact: newData })
    }

    const updateContact = (index: number, field: string, value: string) => {
        const newData = [...formData.contact]
        newData[index] = { ...newData[index], [field]: value }
        setFormData({ ...formData, contact: newData })
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[#070974] tracking-tight text-primary">Edit Club Details</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Update information, status, and events for existing clubs.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" asChild className="rounded-xl border-gray-200 bg-white">
                            <Link href="/">Cancel</Link>
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={!value || isUpdating}
                            className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-6"
                        >
                            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save All Changes
                        </Button>
                    </div>
                </div>

                {/* Club Selector Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-6 mb-8 flex flex-col md:flex-row items-center gap-4 transition-all hover:shadow-md">
                    <div className="p-3 bg-primary/5 rounded-xl text-primary shrink-0">
                        <Search className="h-6 w-6" />
                    </div>
                    <div className="flex-1 w-full relative">
                        <Label className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Select Club to Edit</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between h-12 rounded-xl border-gray-200 font-medium px-4 hover:bg-gray-50 text-gray-700 flex items-center transition-all bg-white"
                                >
                                    {value
                                        ? clubs.find((club) => club.slug === value)?.club_name
                                        : loadingClubs ? "Loading clubs..." : "Search for a club to start editing..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl shadow-2xl border-gray-100" align="start">
                                <Command className="rounded-xl">
                                    <CommandInput placeholder="Search clubs..." className="h-12 border-none focus:ring-0" />
                                    <CommandList className="max-h-[300px]">
                                        <CommandEmpty className="py-6 text-center text-gray-500">No club found.</CommandEmpty>
                                        <CommandGroup>
                                            {clubs.map((club) => (
                                                <CommandItem
                                                    key={club.slug}
                                                    value={club.club_name} // Search by name
                                                    onSelect={() => {
                                                        setValue(club.slug)
                                                        setOpen(false)
                                                    }}
                                                    className="rounded-lg mx-1 my-0.5 cursor-pointer py-3"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4 text-primary",
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
                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-xl border-gray-200 text-gray-400 hover:text-primary transition-colors">
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>

                {!value ? (
                    <div className="py-20 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 italic text-muted-foreground">
                        Please select a club from the dropdown above to begin editing.
                    </div>
                ) : loadingDetails ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <p className="text-muted-foreground font-medium">Fetching club details...</p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Club Identity Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Trophy className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-primary">Club Identity</h2>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="change-club-name" className="text-sm font-medium">Club Name</Label>
                                    <Input
                                        id="change-club-name"
                                        value={formData.club_name}
                                        onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="change-club-logo" className="text-sm font-medium">Logo URL</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="change-club-logo"
                                            placeholder="URL"
                                            value={formData.logo_url}
                                            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                            className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="change-cover-image" className="text-sm font-medium">Cover Image URL</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="change-cover-image"
                                            placeholder="URL"
                                            value={formData.cover_image}
                                            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                                            className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="change-category" className="text-sm font-medium">Category</Label>
                                    <Input
                                        id="change-category"
                                        value={formData.club_category}
                                        onChange={(e) => setFormData({ ...formData, club_category: e.target.value })}
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="change-location" className="text-sm font-medium">Location</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="change-location"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="change-location-map" className="text-sm font-medium">Map Link</Label>
                                    <Input
                                        id="change-location-map"
                                        placeholder="URL"
                                        value={formData.google_map_link}
                                        onChange={(e) => setFormData({ ...formData, google_map_link: e.target.value })}
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-primary">Contact Information</h2>
                                </div>
                                <Button type="button" onClick={addContact} variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5">
                                    <Plus className="h-4 w-4 mr-1" /> Add Contact
                                </Button>
                            </div>
                            <div className="p-8 space-y-4">
                                {formData.contact.length === 0 && (
                                    <p className="text-gray-400 text-center py-4 italic">No contact information added yet. Click 'Add Contact' to start.</p>
                                )}
                                {formData.contact.map((con, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 relative">
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-semibold text-gray-600">Platform (e.g. Facebook, Line, Phone)</Label>
                                                <Input
                                                    value={con.platform}
                                                    onChange={(e) => updateContact(index, "platform", e.target.value)}
                                                    placeholder="Platform name"
                                                    className="rounded-xl border-gray-200 h-10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-semibold text-gray-600">Link or Info</Label>
                                                <Input
                                                    value={con.link}
                                                    onChange={(e) => updateContact(index, "link", e.target.value)}
                                                    placeholder="URL or handle"
                                                    className="rounded-xl border-gray-200 h-10"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeContact(index)}
                                            className="self-end text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-10 w-10"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-primary">Recruitment Status</h2>
                                </div>
                                <div className="p-8 flex flex-col justify-center h-[calc(100%-60px)]">
                                    <Label className="text-sm font-medium mb-3">Currently Open for Applications?</Label>
                                    <Select
                                        value={formData.is_open ? "open" : "closed"}
                                        onValueChange={(val) => setFormData({ ...formData, is_open: val === "open" })}
                                    >
                                        <SelectTrigger className="w-full h-14 rounded-xl border-gray-200 focus:ring-primary/20 text-lg font-medium ring-offset-2">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="open" className="py-3 text-green-600 font-semibold cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    เปิดรับสมัคร (Open)
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="closed" className="py-3 text-red-600 font-semibold cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                                    ปิดรับสมัคร (Closed)
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                                        This status will be reflected on the club list and individual club page for all students.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md bg-gray-50/20">
                                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-primary">Coming Soon</h2>
                                </div>
                                <div className="p-8 flex items-center justify-center italic text-muted-foreground text-sm text-center">
                                    Event management integration is coming in the next update.
                                </div>
                            </div>
                        </div>

                        {/* Narrative Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-primary">Club Narrative</h2>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="short-description" className="text-sm font-medium">Short Pitch</Label>
                                    <Textarea
                                        id="short-description"
                                        placeholder="Show on Club List page"
                                        value={formData.description.short}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            description: { ...formData.description, short: e.target.value }
                                        })}
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 min-h-[80px] resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="full-description" className="text-sm font-medium">Full Biography</Label>
                                    <Textarea
                                        id="full-description"
                                        placeholder="All about your club"
                                        value={formData.description.full}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            description: { ...formData.description, full: e.target.value }
                                        })}
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 min-h-[200px] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
                            <p className="text-sm text-muted-foreground italic">Connect with /api/club/[slug] for real-time updates.</p>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <Button variant="ghost" asChild className="rounded-xl flex-1 sm:flex-none">
                                    <Link href="/">Discard</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    onClick={handleUpdate}
                                    disabled={isUpdating}
                                    className="rounded-xl px-12 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg flex-1 sm:flex-none shadow-xl shadow-primary/25"
                                >
                                    {isUpdating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                                    Update Club Info
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
