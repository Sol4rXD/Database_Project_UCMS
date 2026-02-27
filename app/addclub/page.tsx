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
        is_open: true,
        description: {
            short: "",
            full: ""
        },
        what_we_do: [] as any[],
        position: [] as any[],
        faqs: [] as any[],
        contact: [] as any[]
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

                if (Array.isArray(json)) {
                    json = json[0]
                }

                const s = (val: any) => typeof val === 'string' ? val : ""
                const b = (val: any, fallback: boolean) => typeof val === 'boolean' ? val : fallback

                const importedData = {
                    club_name: s(json.club_name || json.name),
                    club_category: s(json.club_category || json.category),
                    logo_url: s(json.logo_url || json.logo),
                    location: s(json.location),
                    google_map_link: s(json.google_map_link || json.map),
                    is_open: b(json.is_open, true),
                    description: {
                        short: s(json.description?.short || json.short_description),
                        full: s(json.description?.full || json.full_description)
                    },
                    what_we_do: Array.isArray(json.what_we_do) ? json.what_we_do : [],
                    position: Array.isArray(json.position) ? json.position : [],
                    faqs: Array.isArray(json.faqs) ? json.faqs : [],
                    contact: Array.isArray(json.contact) ? json.contact : []
                }

                setFormData(importedData)
                toast.success("JSON data imported! Review and click 'Create Club' to save.")

                if (fileInputRef.current) fileInputRef.current.value = ""
            } catch (error) {
                console.error("JSON Parse Error:", error)
                toast.error("Invalid JSON file format")
            }
        }
        reader.readAsText(file)
    }

    const addWhatWeDo = () => {
        setFormData({
            ...formData,
            what_we_do: [...formData.what_we_do, { activity_name: "", image_url: "", description: "", year: new Date().getFullYear() }]
        })
    }

    const removeWhatWeDo = (index: number) => {
        const newData = [...formData.what_we_do]
        newData.splice(index, 1)
        setFormData({ ...formData, what_we_do: newData })
    }

    const updateWhatWeDo = (index: number, field: string, value: any) => {
        const newData = [...formData.what_we_do]
        newData[index] = { ...newData[index], [field]: value }
        setFormData({ ...formData, what_we_do: newData })
    }

    const addPosition = () => {
        setFormData({
            ...formData,
            position: [...formData.position, { name: "", amount: 1 }]
        })
    }

    const removePosition = (index: number) => {
        const newData = [...formData.position]
        newData.splice(index, 1)
        setFormData({ ...formData, position: newData })
    }

    const updatePosition = (index: number, field: string, value: any) => {
        const newData = [...formData.position]
        newData[index] = { ...newData[index], [field]: value }
        setFormData({ ...formData, position: newData })
    }

    const addFaq = () => {
        setFormData({
            ...formData,
            faqs: [...formData.faqs, { question: "", answer: "" }]
        })
    }

    const removeFaq = (index: number) => {
        const newData = [...formData.faqs]
        newData.splice(index, 1)
        setFormData({ ...formData, faqs: newData })
    }

    const updateFaq = (index: number, field: string, value: string) => {
        const newData = [...formData.faqs]
        newData[index] = { ...newData[index], [field]: value }
        setFormData({ ...formData, faqs: newData })
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
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Trophy className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-primary">Club Details</h2>
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                                <Label htmlFor="is-open" className="text-sm font-semibold text-gray-600 cursor-pointer">
                                    {formData.is_open ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
                                </Label>
                                <div
                                    onClick={() => setFormData({ ...formData, is_open: !formData.is_open })}
                                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${formData.is_open ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${formData.is_open ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </div>
                            </div>
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

                    {/* Positions Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-blue-600">Requirement Positions</h2>
                            </div>
                            <Button type="button" onClick={addPosition} variant="outline" size="sm" className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
                                <Plus className="h-4 w-4 mr-1" /> Add Position
                            </Button>
                        </div>
                        <div className="p-8 space-y-4">
                            {formData.position.length === 0 && (
                                <p className="text-gray-400 text-center py-4 italic">No positions added yet. Click 'Add Position' to start.</p>
                            )}
                            {formData.position.map((pos, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-blue-50/30 rounded-xl border border-blue-100/50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-blue-600">Position Name</Label>
                                            <Input
                                                value={pos.name}
                                                onChange={(e) => updatePosition(index, "name", e.target.value)}
                                                placeholder="e.g. Graphic Designer"
                                                className="rounded-xl border-blue-100 h-10"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-blue-600">Amount (Persons)</Label>
                                            <Input
                                                type="number"
                                                value={pos.amount}
                                                onChange={(e) => updatePosition(index, "amount", parseInt(e.target.value) || 0)}
                                                className="rounded-xl border-blue-100 h-10"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removePosition(index)}
                                        className="self-end text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-10 w-10"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What We Do / Activities Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-emerald-600">What We Do (Activities)</h2>
                            </div>
                            <Button type="button" onClick={addWhatWeDo} variant="outline" size="sm" className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                                <Plus className="h-4 w-4 mr-1" /> Add Activity
                            </Button>
                        </div>
                        <div className="p-8 space-y-6">
                            {formData.what_we_do.length === 0 && (
                                <p className="text-gray-400 text-center py-4 italic">No activities added yet. Click 'Add Activity' to start.</p>
                            )}
                            {formData.what_we_do.map((act, index) => (
                                <div key={index} className="p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100/50 space-y-4 relative animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Activity Name</Label>
                                            <Input
                                                value={act.activity_name}
                                                onChange={(e) => updateWhatWeDo(index, "activity_name", e.target.value)}
                                                placeholder="Volunteer Camp, Tech Workshop..."
                                                className="rounded-xl border-emerald-100 h-11"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Year</Label>
                                            <Input
                                                type="number"
                                                value={act.year}
                                                onChange={(e) => updateWhatWeDo(index, "year", parseInt(e.target.value) || 0)}
                                                className="rounded-xl border-emerald-100 h-11"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Image URL</Label>
                                        <Input
                                            value={act.image_url}
                                            onChange={(e) => updateWhatWeDo(index, "image_url", e.target.value)}
                                            placeholder="https://..."
                                            className="rounded-xl border-emerald-100 h-11"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Description</Label>
                                        <Textarea
                                            value={act.description}
                                            onChange={(e) => updateWhatWeDo(index, "description", e.target.value)}
                                            placeholder="Briefly describe this activity..."
                                            className="rounded-xl border-emerald-100 resize-none min-h-[80px]"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeWhatWeDo(index)}
                                        className="absolute top-2 right-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-amber-600">FAQ's Sections</h2>
                            </div>
                            <Button type="button" onClick={addFaq} variant="outline" size="sm" className="rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50">
                                <Plus className="h-4 w-4 mr-1" /> Add FAQ
                            </Button>
                        </div>
                        <div className="p-8 space-y-4">
                            {formData.faqs.length === 0 && (
                                <p className="text-gray-400 text-center py-4 italic">No FAQs added yet. Click 'Add FAQ' to start.</p>
                            )}
                            {formData.faqs.map((faq, index) => (
                                <div key={index} className="p-4 bg-amber-50/30 rounded-xl border border-amber-100/50 relative animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="space-y-3 pr-8">
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => updateFaq(index, "question", e.target.value)}
                                            placeholder="Question: How do I join?"
                                            className="rounded-xl border-amber-100 h-10 font-medium"
                                        />
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => updateFaq(index, "answer", e.target.value)}
                                            placeholder="Answer: You can join by..."
                                            className="rounded-xl border-amber-100 resize-none min-h-[70px]"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFaq(index)}
                                        className="absolute top-4 right-2 text-red-500 hover:bg-red-50 rounded-xl"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
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
