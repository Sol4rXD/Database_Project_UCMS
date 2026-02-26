"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Trophy, Phone, FileText, MapPin, User, Globe, ArrowLeft, Plus, Loader2, FileJson, Upload } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function AddClubPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        club_name: "",
        club_category: "",
        logo_url: "",
        location: "",
        google_map_link: "",
        advisor_name: "", // Combined from first/last in UI if needed, but let's stick to model or add it
        phone: "",
        other_contact: "",
        description: {
            short: "",
            full: ""
        }
    })

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }

    const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                let json = JSON.parse(event.target?.result as string)

                // If it's an array, take the first club as a preview/import
                if (Array.isArray(json)) {
                    json = json[0]
                }

                // Helper to ensure we only get strings for inputs
                const s = (val: any) => typeof val === 'string' ? val : ""

                // Handle contact mapping from array (mock.json structure)
                let contactVal = s(json.other_contact || json.contact_info)
                if (!contactVal && Array.isArray(json.contact) && json.contact.length > 0) {
                    contactVal = s(json.contact[0].link)
                }

                // Map basic structure with fallbacks
                const importedData = {
                    club_name: s(json.club_name || json.name),
                    club_category: s(json.club_category || json.category),
                    logo_url: s(json.logo_url || json.logo),
                    location: s(json.location),
                    google_map_link: s(json.google_map_link || json.map),
                    advisor_name: s(json.advisor_name || json.advisor),
                    phone: s(json.phone),
                    other_contact: contactVal,
                    description: {
                        short: s(json.description?.short || json.short_description),
                        full: s(json.description?.full || json.full_description)
                    }
                }

                setFormData(importedData)
                toast.success("JSON data imported! Review and click 'Create Club' to save.")

                // Reset input
                if (fileInputRef.current) fileInputRef.current.value = ""
            } catch (error) {
                console.error("JSON Parse Error:", error)
                toast.error("Invalid JSON file format")
            }
        }
        reader.readAsText(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.club_name || !formData.location) {
            toast.error("Please fill in required fields (Name and Location)")
            return
        }

        setIsSubmitting(true)
        try {
            const slug = generateSlug(formData.club_name)
            const payload = {
                ...formData,
                slug,
                is_open: true // Default to open
            }

            await axios.post("/api/club", payload)
            toast.success("Club created successfully!")
            router.push("/")
            router.refresh()
        } catch (error: any) {
            console.error("Creation failed:", error)
            toast.error(error.response?.data?.error || "Failed to create club")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleJsonImport}
                />

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[#070974] tracking-tight">Add New Club</h1>
                        <p className="text-muted-foreground mt-1">Register a new club to the University Global Management System.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-xl border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                        >
                            <FileJson className="mr-2 h-4 w-4 text-indigo-600" /> Import JSON
                        </Button>
                        <Button variant="outline" type="button" asChild className="rounded-xl border-gray-200">
                            <Link href="/">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-6 h-11"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Create Club
                        </Button>
                    </div>
                </div>

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Club Basic Information Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-primary">Club Details</h2>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="club-name" className="text-sm font-medium">Club Name <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <Input
                                        id="club-name"
                                        required
                                        value={formData.club_name}
                                        onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                                        placeholder="e.g. Computer Science Club"
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-4"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="category"
                                        value={formData.club_category}
                                        onChange={(e) => setFormData({ ...formData, club_category: e.target.value })}
                                        placeholder="Sports, Academics, etc."
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="club-logo" className="text-sm font-medium">Club Logo URL</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="club-logo"
                                        value={formData.logo_url}
                                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                        placeholder="https://..."
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium">Campus Location <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="location"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Building name, Room number"
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location-map" className="text-sm font-medium">Google Maps Link</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="location-map"
                                        value={formData.google_map_link}
                                        onChange={(e) => setFormData({ ...formData, google_map_link: e.target.value })}
                                        placeholder="Paste map link here"
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <User className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-primary">Representative & Contact</h2>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="advisor-name" className="text-sm font-medium">Advisor Name</Label>
                                <Input
                                    id="advisor-name"
                                    value={formData.advisor_name}
                                    onChange={(e) => setFormData({ ...formData, advisor_name: e.target.value })}
                                    placeholder="Enter full name"
                                    className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="08X-XXX-XXXX"
                                        className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12 pl-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="other-contact" className="text-sm font-medium">Social Media / Other</Label>
                                <Input
                                    id="other-contact"
                                    value={formData.other_contact}
                                    onChange={(e) => setFormData({ ...formData, other_contact: e.target.value })}
                                    placeholder="Facebook, Line, etc."
                                    className="rounded-xl border-gray-200 focus-visible:ring-primary/20 h-12"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descriptions Section */}
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
                                    value={formData.description.short}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        description: { ...formData.description, short: e.target.value }
                                    })}
                                    placeholder="A catchphrase or one-sentence summary to show in lists"
                                    className="rounded-xl border-gray-200 focus-visible:ring-primary/20 min-h-[80px] resize-none"
                                />
                                <p className="text-xs text-muted-foreground text-right">Max 150 characters recommended</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="full-description" className="text-sm font-medium">In-depth Description</Label>
                                <Textarea
                                    id="full-description"
                                    value={formData.description.full}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        description: { ...formData.description, full: e.target.value }
                                    })}
                                    placeholder="Tell potential members everything they should know about your club..."
                                    className="rounded-xl border-gray-200 focus-visible:ring-primary/20 min-h-[200px] resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
                        <p className="text-sm text-muted-foreground italic">Connect with /api/club for real-time registration.</p>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button variant="ghost" type="button" asChild className="rounded-xl flex-1 sm:flex-none">
                                <Link href="/">Discard</Link>
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="rounded-xl px-12 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg flex-1 sm:flex-none shadow-xl shadow-primary/25"
                            >
                                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Plus className="mr-2 h-5 w-5" />}
                                Create Club
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
