"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface ClubProps {
  name: string;
  location: string;
  imageSrc: string;
  isOpen: boolean;
  description: string;
  slug: string;
}

export default function Card({ name, location, imageSrc, isOpen, description, slug }: ClubProps) {
  const isValidUrl = (url: string) => {
    try {
      return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:");
    } catch {
      return false;
    }
  };

  const [imgSrc, setImgSrc] = useState(isValidUrl(imageSrc) ? imageSrc : "/testpic/dongtaan.png");

  useEffect(() => {
    setImgSrc(isValidUrl(imageSrc) ? imageSrc : "/testpic/dongtaan.png");
  }, [imageSrc]);

  return (
    <Link href={`/club/${slug}`} className="block group">
      <div className="w-full max-w-3xl min-h-[180px] h-auto mx-auto bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-5 flex items-center gap-6 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] hover:-translate-y-1 relative">

        {/* Background Decorative Element */}
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-[0.03] transition-all duration-700 group-hover:scale-150 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />

        {/* Image Container */}
        <div className="flex-shrink-0 w-32 h-32 relative rounded-2xl overflow-hidden transition-colors duration-500">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-contain transform transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgSrc("/testpic/dongtaan.png")}
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col pr-4 h-full relative z-10">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#0f172a] leading-tight line-clamp-2 flex items-center gap-2">
              {name}
            </h2>
            <div className="flex items-center gap-1.5 text-blue-500 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold tracking-wide uppercase">{location}</span>
            </div>

            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
              {description || "No description available for this club."}
            </p>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${isOpen
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                {isOpen ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {isOpen ? 'Open Now' : 'Closed'}
              </div>

              <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-500 transition-colors duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">View Detail</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
