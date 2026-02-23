"use client"


import { useState, useEffect } from "react"


export function News() {
    const slides = [
        "/testpic/driver-recruitment.jpg",
        "/testpic/KCC.png",
    ]

    const [current, setCurrent] = useState(0)


    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }


    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextSlide()
            if (e.key === "ArrowLeft") prevSlide()
        }


        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])


    return (
        <div
            style={{
                background: "#f4f6f9",
                minHeight: "180vh",
                padding: "15px 120px",
            }}
        >
            {/* HERO */}
            <div style={{ textAlign: "center" }}>
                <h1 style={{
                    fontSize: "50px",
                    fontWeight: "700",
                    color: "#0f2b46",
                }}>
                    Big Announcement
                </h1>


                <p style={{ color: "#6b7280", marginTop: "0px" }}>
                    Register now จะเปิดรับสมัครเร็ว ๆ นี้
                </p>
            </div>


            <div className="mt-3 flex justify-center">
                <button
                    className="
                           bg-[#0B2C4D]
                           text-white
                           px-6
                           py-3
                           rounded-full
                           text-lg
                           font-semibold
                           flex
                           items-center
                           gap-3
                           shadow-md
                           transition-all
                           duration-300
                           ease-out
                           hover:scale-105
                           hover:shadow-lg
                           ">
                    Register Now
                    <span className="text-xl">→</span>
                </button>
            </div>


            {/* CAROUSEL */}
            <div
                style={{
                    marginTop: "25px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <div
                        style={{
                            display: "flex",
                            transform: `translateX(-${current * 100}%)`,
                            transition: "transform 0.5s ease",
                        }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                style={{
                                    minWidth: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        background: "#e5e7eb",
                                        borderRadius: "0px",
                                        padding: "8px",
                                        display: "inline-block",
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={slide}
                                        alt={`slide-${index}`}
                                        style={{
                                            height: "500px",
                                            width: "auto",
                                            objectFit: "contain",
                                            display: "block",
                                            borderRadius: "0px",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <button
                    onClick={prevSlide}
                    style={{
                        position: "absolute",
                        left: "250px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#0f2b46",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                >
                    ‹
                </button>


                <button
                    onClick={nextSlide}
                    style={{
                        position: "absolute",
                        right: "250px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#0f2b46",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                >
                    ›
                </button>


                {/* DOTS */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-20px",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrent(index)}
                            style={{
                                display: "inline-block",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                margin: "0 4px",
                                background: current === index ? "#111" : "#ccc",
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* WHAT'S CLUB */}
            <div
                style={{
                    marginTop: "80px",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        color: "#0f2b46",
                    }}
                >
                    What’s club ?
                </h2>

                <p
                    style={{
                        marginTop: "12px",
                        color: "#6b7280",
                        fontSize: "13px",
                    }}
                >
                    Register now จะเด้งไปหน้า รายชื่อชมรมทั้งหมด
                </p>

                <div
                    style={{
                        marginTop: "35px",
                        maxWidth: "1000px",   // ⭐ แคบลงอีก
                        marginInline: "auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                    }}
                >
                    {Array.from({ length: 6 }).map((_, index) => {
                        const isOpen = index % 2 === 0

                        return (
                            <div
                                key={index}
                                style={{
                                    background: "white",
                                    padding: "18px 22px",   // ⭐ บางลง
                                    borderRadius: "14px",
                                    boxShadow:
                                        "0 5px 14px rgba(0,0,0,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "18px",
                                    transition: "0.2s ease",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.transform =
                                    "translateY(-3px)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.transform =
                                    "translateY(0)")
                                }
                            >
                                <img
                                    src="/testpic/dongtaan.png"
                                    style={{
                                        width: "95px",  // ⭐ เล็กลงอีก
                                        objectFit: "contain",
                                    }}
                                />


                                <div style={{ textAlign: "left" }}>
                                    <h3
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#111827",
                                        }}
                                    >
                                        Dongtan Racing Team
                                    </h3>


                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: "#2563eb",
                                            marginTop: "4px",
                                        }}
                                    >
                                        สถานที่: ตึกวิศวกรรมเครื่องกล
                                    </p>


                                    <div
                                        style={{
                                            marginTop: "8px",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            padding: "4px 10px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            background: isOpen
                                                ? "#dcfce7"
                                                : "#fee2e2",
                                            color: isOpen
                                                ? "#16a34a"
                                                : "#dc2626",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: "7px",
                                                height: "7px",
                                                borderRadius: "50%",
                                                background: isOpen
                                                    ? "#16a34a"
                                                    : "#dc2626",
                                            }}
                                        />
                                        {isOpen
                                            ? "เปิดรับสมัคร"
                                            : "ปิดรับสมัคร"}
                                    </div>


                                    <p
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "12px",
                                            color: "#6b7280",
                                            lineHeight: "1.5",
                                            maxWidth: "340px",
                                        }}
                                    >
                                        ทีมแข่งขันของนิสิตคณะวิศวกรรมศาสตร์
                                        ที่มีชื่อเสียงและประสบความสำเร็จ
                                        ในการแข่งขัน Formula Student
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}




