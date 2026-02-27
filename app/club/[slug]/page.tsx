import { notFound } from "next/navigation"
import Image from "next/image"
import { ChevronDown, Quote, Star, MapPin } from "lucide-react"
import ActivityCarousel from "@/components/ActivityCarousel"
import ReviewForm from "@/components/ReviewForm"
import ContactBanner from "@/components/ContactBanner"

async function getClub(slug: string) {
    const res = await fetch(
        `http://localhost:3000/api/club/${slug}`,
        { cache: "no-store" }
    )

    if (!res.ok) return null
    return res.json()
}

export default async function Page(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const club = await getClub(slug)

    if (!club) return notFound()

    const faqs = club.faqs?.length ? club.faqs : [
        {
            question: "How do I join the club?",
            answer: "You can join by clicking the 'Register now' button on the top right. Make sure to check the requirements section first to see if you meet the criteria for your preferred position."
        },
        {
            question: "What are the requirements for new members?",
            answer: "Requirements vary by position. Generally, we look for passion, dedication, and a willingness to learn. Specific technical skills are listed under each position in the 'Requirement Position' section."
        },
        {
            question: "Where can I find more information about club activities?",
            answer: "You can follow our social media platforms listed in the contact section or check the 'What we Do' section below for highlights of our previous activities."
        }
    ]

    const getSafeUrl = (url: any, fallback: string) => {
        if (!url || typeof url !== 'string' || url.trim() === "" || url === "undefined") return fallback;
        const trimmed = url.trim();
        if (trimmed.startsWith("http")) return trimmed;
        if (trimmed.startsWith("/")) return trimmed;
        if (trimmed.startsWith("data:")) return trimmed; // Allow Base64/Data URLs
        return `/${trimmed}`;
    };

    const logoUrl = getSafeUrl(club.logo_url, "/testpic/dongtaan.png");

    return (
        <main className="bg-[#F5F7FA] text-[#0f2b46]">

            {/* ================= HERO SECTION ================= */}
            <section className="max-w-[1180px] mx-auto px-6 pt-10">

                <div className="w-full h-[420px] relative rounded-3xl overflow-hidden bg-slate-200">
                    <Image
                        src={logoUrl}
                        alt={club.club_name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-12">

                        <div>
                            <h1 className="text-[52px] font-extrabold text-[#0B2C4D] leading-[1.1] tracking-tight">
                                {club.club_name}
                            </h1>
                            <div className="flex items-center gap-2 mt-4 text-blue-600 font-semibold tracking-wide uppercase text-sm">
                                <span className="w-8 h-[2px] bg-blue-600"></span>
                                {club.club_category || "General Club"}
                            </div>

                            <p className="mt-8 text-[17px] text-gray-600 leading-relaxed font-medium">
                                {club.description?.full ||
                                    club.description?.short ||
                                    "No description available"}
                            </p>
                        </div>

                        {/* REQUIREMENT POSITIONS - High Contrast Refactor */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 01-2-2V7m2 13a2 2 0 01-2-2V7m-2-3H9m12 0h-3" />
                                    </svg>
                                </div>
                                <h3 className="text-[28px] font-bold text-[#0B2C4D]">
                                    Requirement Positions
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {club.position?.length ? (
                                    club.position.map((pos: any, i: number) => (
                                        <div
                                            key={pos._id || i}
                                            className="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                    <span className="font-bold text-lg">{i + 1}</span>
                                                </div>
                                                <span className="font-bold text-[#1e293b] text-lg">{pos.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-blue-200 shadow-lg">
                                                {pos.amount} <span className="text-[10px] uppercase opacity-80">Seats</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400 font-medium">
                                        No specific positions listed at the moment.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* LOCATION */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <MapPin className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-[28px] font-bold text-[#0B2C4D]">
                                    Club Location
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="font-bold text-slate-800">Address:</span> {club.location}
                                </div>
                                {(() => {
                                    let mapUrl = null;

                                    if (club.google_map_link) {
                                        const rawLink = club.google_map_link;
                                        const coordMatch = rawLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

                                        if (coordMatch) {
                                            const lat = coordMatch[1];
                                            const lng = coordMatch[2];
                                            mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                                        } else if (rawLink.includes("output=embed")) {
                                            mapUrl = rawLink;
                                        } else {
                                            mapUrl = `${rawLink}${rawLink.includes('?') ? '&' : '?'}output=embed`;
                                        }
                                    } else if (club.location) {
                                        mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(club.location)}&output=embed`;
                                    }

                                    return mapUrl ? (
                                        <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white relative z-10">
                                            <iframe
                                                src={mapUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-slate-100 h-[200px] flex items-center justify-center rounded-3xl text-slate-400 font-medium border-2 border-dashed border-slate-200">
                                            No location information available
                                        </div>
                                    );
                                })()}
                            </div>
                        </section>

                    </div>

                    {/* RIGHT CARD - Sticky Summary */}
                    <div className="space-y-6 lg:sticky lg:top-10 h-fit">
                        <div className="bg-[#0B2C4D] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400 opacity-20 blur-[80px] group-hover:opacity-30 transition-opacity" />

                            <div className="relative z-10">
                                <p className="text-blue-200 text-sm font-bold uppercase tracking-widest">
                                    Recruiting Status
                                </p>

                                <div className="flex items-baseline gap-2 mt-4">
                                    <span className="text-6xl font-black">
                                        {club.position?.length
                                            ? club.position.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
                                            : (club.member_count ?? 0)
                                        }
                                    </span>
                                    <span className="text-2xl font-bold text-blue-200">Seats</span>
                                </div>

                                <p className="mt-8 text-blue-100/60 text-sm font-medium leading-relaxed">
                                    Join our community and grow your skills with passionate people. Applications are reviewed on a rolling basis.
                                </p>

                                <button
                                    className={`mt-10 w-full py-5 rounded-2xl text-[16px] font-black tracking-wide uppercase transition-all duration-300 shadow-xl
                    ${club.is_open
                                            ? "bg-white text-[#0B2C4D] hover:bg-blue-50 hover:scale-[1.02] shadow-blue-900/40"
                                            : "bg-white/10 text-white/40 cursor-not-allowed shadow-none"}
                  `}
                                    disabled={!club.is_open}
                                >
                                    {club.is_open ? "Apply for Club" : "Registration Closed"}
                                </button>

                                {club.is_open && (
                                    <p className="text-center mt-4 text-[11px] text-blue-300 font-bold uppercase tracking-tighter animate-pulse">
                                        • Limited spots available •
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats/Info */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                                <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Member Count</span>
                                <span className="text-slate-900 font-bold">{club.member_count || 0} Members</span>
                            </div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                                <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Category</span>
                                <span className="text-blue-600 font-bold">{club.club_category || "General"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="h-[8px] bg-[#0B2C4D] mt-14" />

            {/* ================= WHAT WE DO (Client Side Component) ================= */}
            <ActivityCarousel whatWeDo={club.what_we_do || []} logoUrl={club.logo_url} />

            <div className="h-[8px] bg-[#0B2C4D]" />

            {/* ================= FAQ SECTION ================= */}
            <section className="bg-[#F9FAFB] py-24">
                <div className="max-w-[1180px] mx-auto px-6 flex items-start gap-20">
                    <div className="flex-1 space-y-4">
                        {faqs.map((faq: any, i: number) => (
                            <details key={i} className="group border-b border-gray-200 pb-4">
                                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                                    <h4 className="text-[18px] font-semibold text-[#0B2C4D]">
                                        {faq.question}
                                    </h4>
                                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-400" />
                                </summary>
                                <div className="mt-5 text-[15px] text-gray-500 leading-relaxed px-1">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="w-[450px] relative">
                        <div className="absolute -top-12 right-0 inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                            <span className="text-[12px] font-semibold text-black">FAQ's</span>
                        </div>
                        <h2 className="text-[64px] font-bold text-[#0B2C4D] leading-[1.1] text-right">
                            Frequently<br />
                            Asked<br />
                            Questions
                        </h2>
                        <p className="text-right text-gray-400 mt-0 text-[14px]">
                            คำถามที่พบบ่อยเกี่ยวกับการสมัคร
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= REVIEWS ================= */}
            <section className="bg-[#062B4D] pt-12 pb-20">
                <div className="max-w-[1100px] mx-auto px-6">

                    <h2 className="text-center text-[36px] font-bold text-white mb-10 tracking-wide">
                        REVIEWS FROM US
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
                        {/* INPUT REVIEW CARD */}
                        <ReviewForm slug={slug} positions={club.position} />

                        {club.reviews?.map((review: any, i: number) => (
                            <div
                                key={i}
                                className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col relative overflow-hidden max-w-[340px] mx-auto w-full"
                            >
                                {/* TOP BADGE */}
                                <div className="self-start bg-[#E8F8F0] text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-md mb-4 leading-none text-center">
                                    {review.position || "Member"}
                                </div>

                                {/* MAIN TEXT */}
                                <p className="text-[14px] text-[#374151] leading-relaxed mb-4 font-medium">
                                    {review.text || "No review available"}
                                </p>

                                {/* STARS */}
                                <div className="flex gap-1 mb-6 mt-auto">
                                    {[...Array(5)].map((_, starI) => (
                                        <Star
                                            key={starI}
                                            className={`w-4 h-4 ${starI < (review.star || 5) ? 'fill-[#FBBF24] text-[#FBBF24]' : 'fill-gray-200 text-gray-200'}`}
                                        />
                                    ))}
                                </div>

                                {/* PROFILE FOOTER (Avatar Left of Name/Bio) */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative border-1 border-white shadow-sm">
                                        <Image
                                            src={getSafeUrl(review.user_image, "/testpic/anonymous.webp")}
                                            alt="avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <h5 className="font-bold text-[13px] text-[#111827] leading-tight">{review.name || "Anonymous"}</h5>
                                        <p className="text-[11px] text-[#6B7280] mt-0.5">{review.year ? `Class of ${review.year}` : "Member"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactBanner contacts={club.contact} />
        </main >
    )
}

