"use client"
import { useParams } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const clubs = [{
    name: "Dongatan",
    image: "/testpic/driver-recruitment.jpg",
    location: "13.7563,100.5018",
    requirement: [
        "ตัดต่อ 1 คน",
        "ตัดต่อ 1 คน",
        "ตัดต่อ 1 คน",
        "ตัดต่อ 1 คน",
        "ตัดต่อ 1 คน",
    ],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It was popularised in the 1960s with the release of Letraset sheets."
}
]


const ClubDetail = () => {
    const { name } = useParams();

    const [open, setOpen] = useState<number | null>(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return

        const scrollAmount = 370

        if (direction === "left") {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        } else {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    const [isHovering, setIsHovering] = useState(false)
    // AUTO SLIDE
    useEffect(() => {
        if (isHovering) return

        const interval = setInterval(() => {
            if (!sliderRef.current) return

            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current

            // ถ้าเลื่อนสุดแล้ว → กลับต้น
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                sliderRef.current.scrollTo({ left: 0, behavior: "smooth" })
            } else {
                sliderRef.current.scrollBy({ left: 370, behavior: "smooth" })
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [isHovering])

    const faqs = [
        "How do I start searching for a property with Urbanouse?",
        "What services does Urbanouse offer for first-time homebuyers?",
        "Can Urbanouse help me sell my property?"
    ]

    return (
        <main className="bg-[#F5F7FA] text-[#0f2b46]">

            {/* ================= TOP SECTION ================= */}
            <section className="max-w-[1180px] mx-auto px-6 pt-10">

                {/* ================= IMAGE GRID ================= */}
                <div className="grid grid-cols-3 gap-3">

                    {/* LEFT 4 IMAGES */}
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Image
                                key={i}
                                src="/testpic/driver-recruitment.jpg"
                                alt=""
                                width={500}
                                height={300}
                                className="rounded-3xl object-cover w-full h-[185px]"
                            />
                        ))}
                    </div>

                    {/* RIGHT BIG IMAGE */}
                    <div className="col-span-2">
                        <Image
                            src="/testpic/driver-recruitment.jpg"
                            alt=""
                            width={1200}
                            height={800}
                            className="rounded-3xl object-cover w-full h-[385px]"
                        />
                    </div>

                </div>

                {/* ================= CONTENT GRID ================= */}
                <div className="grid grid-cols-3 gap-16 mt-9">

                    {/* LEFT CONTENT */}
                    <div className="col-span-2">

                        <h1 className="text-[46px] font-bold leading-[1.2]">
                            {decodeURIComponent(name as any)}
                        </h1>

                        <p className="mt-6 text-[15px] text-gray-500 leading-relaxed max-w-[760px]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            It was popularised in the 1960s with the release of Letraset sheets.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            It was popularised in the 1960s with the release of Letraset sheets.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            It was popularised in the 1960s with the release of Letraset sheets.
                        </p>

                        {/* REQUIREMENT TITLE */}
                        <h3 className="mt-12 text-[25px] font-semibold">
                            Requirement Position
                        </h3>

                        {/* REQUIREMENT BOX */}
                        <div className="mt-4 border border-gray-200 rounded-2xl px-7 py-4 shadow-sm">

                            <div className="grid grid-cols-3 gap-y-5 gap-x-5 text-[14px]">

                                <div><span className="mr-2">•</span>ตัดต่อ 1 คน</div>
                                <div><span className="mr-2">•</span>ตัดต่อ 1 คน</div>
                                <div><span className="mr-2">•</span>ตัดต่อ 1 คน</div>
                                <div><span className="mr-2">•</span>ตัดต่อ 1 คน</div>
                                <div><span className="mr-2">•</span>ตัดต่อ 1 คน</div>

                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="col-span-2"></div>
                        <div className="mt-10">
                            <h3 className="text-[26px] font-semibold mb-3">
                                Location
                            </h3>

                            <div className="w-full h-[460px] rounded-[15px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">                                <iframe
                                src="https://www.google.com/maps?q=13.7563,100.5018&z=15&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-fit">

                        <p className="text-gray-500 text-[14px]">
                            จำนวนที่รับสมัคร
                        </p>

                        <p className="text-[42px] font-bold mt-2">
                            60 คน
                        </p>

                        <button className="mt-3 w-full bg-[#0B2C4D] text-white py-4 rounded-xl text-[15px] font-semibold hover:opacity-90 transition">
                            Register now
                        </button>

                    </div>

                </div>
            </section>

            {/* BLUE DIVIDER */}
            <div className="h-[8px] bg-[#0B2C4D] mt-12" />

            {/* ================= WHAT WE DO ================= */}
            <section className="bg-white py-13">
                <div className="max-w-[1180px] mx-auto px-6 relative">

                    <div className="inline-flex items-center gap-2 bg-[#F2F2F2] px-4 py-2 rounded-full mb-4">
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                        <span className="text-[13px] font-medium text-black">
                            Highlight
                        </span>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-[36px] font-bold">
                            What we Do ?
                        </h2>

                        {/* ARROW BUTTONS */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => scroll("left")}
                                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                onClick={() => scroll("right")}
                                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* SLIDER */}
                    <div
                        ref={sliderRef}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="min-w-[350px] flex-shrink-0"
                            >
                                <Image
                                    src="/testpic/driver-recruitment.jpg"
                                    alt=""
                                    width={400}
                                    height={250}
                                    className="rounded-3xl object-cover w-full h-[240px]"
                                />
                                <h4 className="mt-5 font-semibold text-[16px]">
                                    Activity Name
                                </h4>
                                <p className="text-[13px] text-gray-400 mt-1">Year</p>
                                <p className="text-[13px] text-gray-400 mt-1">Description</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* BLUE DIVIDER */}
            <div className="h-[8px] bg-[#0B2C4D]" />

            {/* ================= FAQ ================= */}
            <section className="bg-[#F5F7FA] py-15">
                <div className="max-w-[1180px] mx-auto px-6">

                    {/* OUTER BOX */}
                    <div className="bg-white/10 border border-gray-150 rounded-2xl p-16 relative">

                        {/* BADGE */}
                        <div className="absolute top-18 right-19">
                            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                <span className="text-[13px] font-medium text-black">
                                    FAQ's
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 items-start">

                            {/* LEFT SIDE */}
                            <div>
                                {faqs.map((q, index) => (
                                    <div key={index} className="border-b border-gray-200 py-7">
                                        <button
                                            onClick={() => setOpen(open === index ? null : index)}
                                            className="flex justify-between w-full text-left text-[18px] font-medium text-[#1E2A38]"
                                        >
                                            {q}
                                            <ChevronDown
                                                size={20}
                                                className={`transition-transform duration-300 ${open === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {open === index && (
                                            <p className="text-[15px] text-gray-500 mt-4 pr-10 leading-relaxed">
                                                You can begin browsing our property search tool which allows you
                                                to filter by location, property type and price.
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col items-end text-right pt-12 pr-6">
                                <h2 className="text-[72px] font-bold leading-[1.05] text-[#0F2B46]">
                                    Frequently Asked
                                    <br />
                                    Questions
                                </h2>

                                <p className="text-gray-400 text-[16px] mt-1 max-w-[420px]">
                                    คำถามที่พบบ่อยเกี่ยวกับการสมัคร
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



            {/* ================= REVIEWS ================= */}
            <section className="bg-[#062B4D] py-16">
                <div className="max-w-[1100px] mx-auto px-6">

                    {/* TITLE */}
                    <h2 className="text-center text-[36px] font-bold text-[#F2E6E6] mb-12 tracking-wide">
                        REVIEWS FROM US
                    </h2>

                    {/* CARDS */}
                    <div className="grid grid-cols-3 gap-6">

                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-[#F4F4F4] rounded-[26px] p-7 shadow-md"
                            >
                                {/* TAG */}
                                <div className="inline-block bg-green-100 text-green-700 text-[12px] font-semibold px-3 py-1.5 rounded-md mb-4">
                                    Tourist Evisa
                                </div>

                                {/* TEXT */}
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Applying for my visa was a breeze with 190evisa.com! I entered my
                                    details, uploaded my photo, and paid. My visa arrived in just three
                                    days. I'll use this service again!
                                </p>

                                {/* STARS */}
                                <div className="mt-4 text-yellow-400 text-[16px]">
                                    ★ ★ ★ ★ ★
                                </div>

                                {/* AUTHOR */}
                                <div className="mt-5 flex items-center gap-3">

                                    {/* PROFILE IMAGE */}
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                                        <img
                                            src="/testpic/dongtaan.png"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* INFO */}
                                    <div>
                                        <p className="font-semibold text-[14px] text-[#1E2A38]">
                                            Dongtaan, Thailand
                                        </p>
                                        <p className="text-gray-500 text-[13px]">
                                            Freelance Writer
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

        </main>
    )
}

export default ClubDetail
