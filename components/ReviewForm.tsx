"use client";

import React, { useState, useEffect } from "react";
import { Star, Send, User, Loader2, Check, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "./AuthProvider";

export default function ReviewForm({ slug, clubId, existingReviews = [] }: { slug: string, clubId: string, existingReviews?: any[] }) {
    const { user, loading: authLoading } = useAuth();
    const [star, setStar] = useState(5);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [isMember, setIsMember] = useState(false);
    const [loadingMember, setLoadingMember] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [myReview, setMyReview] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const checkMembership = async () => {
            if (authLoading) return;
            if (!user) {
                setLoadingMember(false);
                return;
            }

            const uId = user.id.toString();
            setUserId(uId);
            setName(user.fullname || "");

            // Find my review if exists
            const mine = existingReviews.find(r => r.user_id === uId);
            if (mine) {
                setMyReview(mine);
            }

            try {
                const res = await axios.get(`/api/usersclub?user_id=${user.id}&club_id=${clubId}`);
                if (res.data) {
                    setIsMember(true);
                }
            } catch (error) {
                console.error("Failed to check membership:", error);
            } finally {
                setLoadingMember(false);
            }
        };

        checkMembership();
    }, [clubId, existingReviews, user, authLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !isMember) {
            toast.error("You must be a member to review this club.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (isEditing) {
                await axios.put(`/api/club/${slug}/review`, {
                    user_id: userId,
                    name: isAnonymous ? "Anonymous" : name,
                    text,
                    star,
                    year: parseInt(year),
                });
                toast.success("แก้ไขรีวิวเรียบร้อยครับ!");
            } else {
                await axios.post(`/api/club/${slug}/review`, {
                    user_id: userId,
                    name: isAnonymous ? "Anonymous" : name,
                    text,
                    star,
                    position: "Member",
                    year: parseInt(year),
                });
                toast.success("ขอบคุณสำหรับรีวิวครับ!");
            }

            setIsEditing(false);
            setText("");
            setStar(5);
            router.refresh();
        } catch (error: any) {
            console.error("Submit Review Error:", error);
            toast.error(error.response?.data?.error || "Failed to submit review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!userId || !confirm("คุณต้องการลบรีวิวนี้ใช่หรือไม่?")) return;

        setIsSubmitting(true);
        try {
            await axios.delete(`/api/club/${slug}/review?user_id=${userId}`);
            toast.success("ลบรีวิวเรียบร้อยครับ");
            setMyReview(null);
            router.refresh();
        } catch (error: any) {
            toast.error("Failed to delete review");
        } finally {
            setIsSubmitting(false);
        }
    };

    const startEdit = () => {
        if (!myReview) return;
        setStar(myReview.star);
        setText(myReview.text);
        setYear(myReview.year.toString());
        setIsAnonymous(myReview.name === "Anonymous");
        setName(myReview.name === "Anonymous" ? name : myReview.name);
        setIsEditing(true);
    };

    if (loadingMember || !isMember) {
        return null;
    }

    // If already reviewed and not editing, show "My Review" status or Edit button
    if (myReview && !isEditing) {
        return (
            <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full relative group border border-blue-100 max-w-[340px] mx-auto w-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Your Review
                    </div>
                    <div className="flex gap-2">
                        <button onClick={startEdit} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <p className="text-[14px] text-gray-600 italic mb-4">"คุณได้ทำการรีวิวชมรมนี้ไปแล้ว สามารถแก้ไขหรือลบรีวิวได้จากปุ่มด้านบน"</p>
                <div className="mt-auto flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < myReview.star ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full relative group border border-gray-100 max-w-[340px] mx-auto w-full overflow-visible">
            {isEditing && (
                <button
                    onClick={() => setIsEditing(false)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all z-10"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col h-full">

                <div className="flex items-center justify-between mb-4">
                    {/* ANONYMOUS TOGGLE */}
                    <div className="flex items-center gap-2 bg-slate-50 self-start px-3 py-1.5 rounded-full border border-slate-100 transition-all">
                        <button
                            type="button"
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${isAnonymous ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"
                                }`}
                        >
                            {isAnonymous && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none cursor-pointer" onClick={() => setIsAnonymous(!isAnonymous)}>
                            Anonymous
                        </span>
                    </div>

                    {isEditing && (
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Editing Mode</span>
                    )}
                </div>

                {/* TEXT AREA */}
                <div className="flex-1 mb-4">
                    <textarea
                        placeholder="Share your experience..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-full text-[14px] text-[#374151] leading-relaxed bg-transparent outline-none resize-none placeholder-gray-300 font-medium min-h-[100px]"
                        required
                    />
                </div>

                {/* STARS */}
                <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <button
                            key={s}
                            type="button"
                            onMouseEnter={() => setHover(s)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setStar(s)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-4 h-4 ${(hover || star) >= s
                                    ? "fill-[#FBBF24] text-[#FBBF24]"
                                    : "text-[#E5E7EB]"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* PROFILE FOOTER */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-dashed border-gray-300 group-hover:border-[#0B2C4D]">
                            <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={isAnonymous ? "Anonymous" : name}
                                onChange={(e) => !isAnonymous && setName(e.target.value)}
                                disabled={isAnonymous}
                                className={`text-[13px] font-bold text-[#111827] bg-transparent outline-none placeholder-gray-300 w-full ${isAnonymous ? "text-gray-400 italic" : ""}`}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Year (e.g. 2025)"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="text-[11px] text-[#6B7280] bg-transparent outline-none mt-0.5 placeholder-gray-200 w-full"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 shrink-0 ${isEditing ? "bg-blue-500" : "bg-[#0B2C4D]"} text-white`}
                    >
                        {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </form>
        </div>
    );
}