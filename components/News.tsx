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
                background: "#F8FAFC",
                minHeight: "90vh",
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
        </div>
    )
}




