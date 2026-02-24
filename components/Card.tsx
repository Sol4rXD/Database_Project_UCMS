import Image from "next/image";

interface ClubProps {
  name: string;
  location: string;
  imageSrc: string;
  status: string;
}

export default function Card({ name, location, imageSrc, status }: ClubProps) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden p-5 flex items-center gap-6 border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex-shrink-0 w-32 h-32 relative">
        <Image
          src={imageSrc} 
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-grow space-y-2">
        <h2 className="text-xl font-bold text-black leading-tight">
          {name} 
        </h2>
        <p className="text-sm text-blue-500 font-medium -mt-1">
          สถานที่: {location}
        </p>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-green-500 bg-green-50 text-green-600">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs font-bold">{status}</span>
        </div>
        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
          คือทีมแข่งรถของนิสิตคณะวิศวกรรมศาสตร์ที่มีชื่อเสียงและประวัติยาวนาน...
        </p>
      </div>
    </div>
  );
}
