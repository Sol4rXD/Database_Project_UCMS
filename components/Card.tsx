"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ClubProps {
  name: string;
  location: string;
  imageSrc: string;
  status: string;
  description: string;
}

export default function Card({ name, location, imageSrc, status, description }: ClubProps) {
  const isValidUrl = (url: string) => {
    try {
      return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const [imgSrc, setImgSrc] = useState(isValidUrl(imageSrc) ? imageSrc : "/testpic/dongtaan.png");

  useEffect(() => {
    setImgSrc(isValidUrl(imageSrc) ? imageSrc : "/testpic/dongtaan.png");
  }, [imageSrc]);

  return (
    <div className="w-full max-w-3xl h-[180px] mx-auto bg-white rounded-3xl shadow-lg overflow-hidden px-6 py-5 flex items-center gap-6 border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex-shrink-0 w-28 h-28 relative rounded-2xl overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-contain"
          onError={() => setImgSrc("/testpic/dongtaan.png")}
        />
      </div>

      <div className="flex-grow flex flex-col space-y-3 py-1">
        <div>
          <h2 className="text-lg font-bold text-black leading-tight line-clamp-2">
            {name}
          </h2>
          <p className="text-sm text-blue-500 font-medium mt-1">
            สถานที่: {location}
          </p>
        </div>

        <div className="space-y-2 -mt-1.5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border w-fit ${status === 'เปิดรับสมัคร' ? 'border-green-500 bg-green-50 text-green-600' : 'border-red-500 bg-red-50 text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${status === 'เปิดรับสมัคร' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold">{status}</span>
          </div>

          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
