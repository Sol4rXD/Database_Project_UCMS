"use client";

import React, { useState } from "react";
import { Star, Send, User, ChevronDown } from "lucide-react";

export default function ReviewForm({ slug, positions }: { slug: string, positions?: any[] }) {
    const [star, setStar] = useState(5);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [selectedPosition, setSelectedPosition] = useState(positions?.[0]?.name || "Member");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPosDropdown, setShowPosDropdown] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare the review data
        const reviewData = {
            name,
            text,
            star,
            position: selectedPosition,
            year: parseInt(year),
        };

        console.log("Submitting Review:", reviewData);

        setTimeout(() => {
            alert("ขอบคุณสำหรับรีวิวครับ!");
            setIsSubmitting(false);
            setName("");
            setText("");
            setYear(new Date().getFullYear().toString());
            setStar(5);
        }, 1000);
    };

    return (
        <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full relative group border border-gray-100 max-w-[340px] mx-auto w-full">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* TOP BADGE (Dropdown for Position/Dept) */}
                <div className="relative self-start mb-4">
                    <button
                        type="button"
                        onClick={() => setShowPosDropdown(!showPosDropdown)}
                        className="bg-[#E8F8F0] text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 hover:bg-[#D1FAE5] transition-colors"
                    >
                        {selectedPosition}
                        <ChevronDown className={`w-3 h-3 transition-transform ${showPosDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showPosDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-1">
                            {positions && positions.length > 0 ? (
                                positions.map((pos, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPosition(pos.name);
                                            setShowPosDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-[12px] text-gray-600 hover:bg-gray-50 hover:text-[#10B981] transition-colors border-b border-gray-50 last:border-none"
                                    >
                                        {pos.name}
                                    </button>
                                ))
                            ) : (
                                ["Member", "Staff", "Lead", "Designer"].map((p, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPosition(p);
                                            setShowPosDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-[12px] text-gray-600 hover:bg-gray-50 last:border-none"
                                    >
                                        {p}
                                    </button>
                                ))
                            )}
                        </div>
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
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setStar(star)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-4 h-4 ${(hover || star) >= star
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-[13px] font-bold text-[#111827] bg-transparent outline-none placeholder-gray-300 w-full"
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
                        className="w-8 h-8 bg-[#0B2C4D] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 shrink-0"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </form>
        </div>
    );
}