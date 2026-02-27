"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ActivityCarousel({ whatWeDo, logoUrl }: { whatWeDo: any[], logoUrl: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const getSafeUrl = (url: any, fallback: string) => {
        if (!url || typeof url !== 'string' || url.trim() === "" || url === "undefined") return fallback;
        const trimmed = url.trim();
        if (trimmed.startsWith("http")) return trimmed;
        if (trimmed.startsWith("/")) return trimmed;
        if (trimmed.startsWith("data:")) return trimmed; // Allow Base64/Data URLs
        return `/${trimmed}`;
    };

    const items = whatWeDo?.length
        ? whatWeDo.map(item => ({
            image_url: getSafeUrl(item.image_url, "https://images.unsplash.com/photo-1547744152-14d985cb937f?q=80&w=1000&auto=format&fit=crop"),
            activity_name: item.activity_name || "Activity",
            description: item.description || "",
            year: item.year || ""
        }))
        : [
            { image_url: getSafeUrl(logoUrl, "/testpic/dongtaan.png"), activity_name: "Volunteer Camp", description: "Sharing happiness with children in remote areas.", year: 2024 },
            { image_url: getSafeUrl(logoUrl, "/testpic/dongtaan.png"), activity_name: "Tech Workshop", description: "Learning new technologies together with experts.", year: 2024 },
            { image_url: getSafeUrl(logoUrl, "/testpic/dongtaan.png"), activity_name: "Charity Run", description: "Running for a cause to help local communities.", year: 2024 },
        ];

    const totalPages = Math.max(1, items.length - 2);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const itemWidth = (290 + 24); // Smaller width + gap
            const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const scrollToPage = (index: number) => {
        if (scrollRef.current) {
            const itemWidth = (290 + 24);
            scrollRef.current.scrollTo({
                left: index * itemWidth,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollLeft } = scrollRef.current;
                const itemWidth = (290 + 24);
                const currentIdx = Math.round(scrollLeft / itemWidth);
                if (currentIdx < totalPages) {
                    setActiveIndex(currentIdx);
                }
            }
        };

        const scroller = scrollRef.current;
        if (scroller) {
            scroller.addEventListener("scroll", handleScroll);
        }

        // AUTO SLIDE LOGIC
        const autoSlide = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

                if (isAtEnd) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scroll("right");
                }
            }
        }, 4000); // Scroll every 4 seconds

        return () => {
            if (scroller) scroller.removeEventListener("scroll", handleScroll);
            clearInterval(autoSlide);
        };
    }, [totalPages]);

    return (
        <section className="bg-[#0B2C4D] py-14 relative overflow-hidden">
            {/* --- LIGHT SOFT MESH BACKGROUND --- */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0B2C4D]/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-[1000px] mx-auto px-6 relative z-10">
                {/* HEADER SECTION */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-4">
                            <span className="block w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-white tracking-wider uppercase">Club Activities</span>
                        </div>
                        <h2 className="text-[44px] font-bold text-white tracking-tight leading-tight">
                            What we Do ?
                        </h2>
                    </div>

                    <div className="flex gap-2.5 mb-1">
                        <button
                            onClick={() => scroll("left")}
                            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0B2C4D] transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0B2C4D] transition-all duration-300"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* CAROUSEL CONTENT */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 scroll-smooth"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {items.map((img: any, i: number) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[290px] snap-start group cursor-pointer"
                        >
                            <div className="bg-white rounded-[28px] p-2 border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] group-hover:-translate-y-2">
                                {/* IMAGE */}
                                <div className="relative w-full h-[190px] rounded-[22px] overflow-hidden bg-slate-100">
                                    <Image
                                        src={img.image_url || "https://images.unsplash.com/photo-1547744152-14d985cb937f?q=80&w=1000&auto=format&fit=crop"}
                                        alt={img.activity_name || "activity"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-xl shadow-lg border border-gray-50">
                                        <span className="text-[12px] font-black text-[#0B2C4D] tracking-tight">{img.year}</span>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-4 pt-5">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="h-px w-5 bg-[#10B981]" />
                                        <span className="text-[9px] font-bold text-[#10B981] uppercase tracking-widest">Activity</span>
                                    </div>
                                    <h4 className="text-[18px] font-bold text-[#0B2C4D] group-hover:text-[#10B981] transition-colors duration-300 tracking-tight">
                                        {img.activity_name || `Activity Name`}
                                    </h4>
                                    <p className="text-[13px] text-slate-500 mt-2.5 leading-relaxed line-clamp-2 font-medium">
                                        {img.description || "Description of the activity goes here. It explains what happened during this event."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToPage(i)}
                            className={`group relative h-1 transition-all duration-500 ${i === activeIndex ? "w-8" : "w-2 hover:w-4"
                                }`}
                        >
                            <span className={`absolute inset-0 rounded-full transition-all duration-500 ${i === activeIndex ? "bg-[#10B981]" : "bg-white/20 group-hover:bg-white/30"
                                }`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}