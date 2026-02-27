import { notFound } from "next/navigation"
import Image from "next/image"
import { ChevronDown, Quote, Star } from "lucide-react"
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

                <div className="grid grid-cols-3 gap-16 mt-10">

                    {/* LEFT CONTENT */}
                    <div className="col-span-2">

                        <h1 className="text-[46px] font-bold leading-[1.2]">
                            {club.club_name}
                        </h1>

                        <p className="mt-6 text-[15px] text-gray-500 leading-relaxed">
                            {club.description?.short ||
                                club.description?.full ||
                                "No description available"}
                        </p>

                        {/* REQUIREMENT */}
                        <h3 className="mt-12 text-[25px] font-semibold">
                            Requirement Position
                        </h3>

                        <div className="mt-4 border border-gray-200 rounded-2xl px-7 py-6 shadow-sm">
                            <div className="grid grid-cols-2 gap-y-4 text-[14px]">
                                {club.position?.length ? (
                                    club.position.map((pos: any, i: number) => (
                                        <div key={pos._id || i}>
                                            • {pos.name} ({pos.amount} คน)
                                        </div>
                                    ))
                                ) : (
                                    <div>No position available</div>
                                )}
                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="mt-12">
                            <h3 className="text-[26px] font-semibold mb-3">
                                Location
                            </h3>

                            {(() => {
                                let mapUrl = null;

                                if (club.google_map_link) {
                                    const rawLink = club.google_map_link;

                                    // Check if it's a coordinate link like .../@13.85,100.54
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
                                    <div className="w-[585px] h-[400px] rounded-[15px] overflow-hidden shadow-lg border border-gray-100">
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
                                    <div className="bg-gray-200 h-[200px] flex items-center justify-center rounded-xl text-gray-400">
                                        No location information available
                                    </div>
                                );
                            })()}
                        </div>

                    </div>

                    {/* RIGHT CARD */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-fit">

                        <p className="text-gray-500 text-[14px]">
                            จำนวนที่รับสมัคร
                        </p>

                        <p className="text-[42px] font-bold mt-2">
                            {club.position?.length
                                ? club.position.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
                                : (club.member_count ?? 10)
                            } คน
                        </p>

                        <button
                            className={`mt-2 w-full py-4 rounded-xl text-[15px] font-semibold transition
                ${club.is_open
                                    ? "bg-[#0B2C4D] text-white hover:opacity-90"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"}
              `}
                            disabled={!club.is_open}
                        >
                            {club.is_open ? "Register now" : "Closed"}
                        </button>

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

