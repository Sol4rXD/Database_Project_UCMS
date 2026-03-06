"use client"

import { useState, useEffect, useRef } from "react"

export function News() {

    const slides = [
        "/testpic/driver-recruitment.jpg",
        "/testpic/KUACOU.png",
        "/testpic/KUTECH.png",
    ]

    const [current, setCurrent] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            nextSlide()
        }, 3000)
    }

    const resetAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        startAutoSlide()
    }

    useEffect(() => {
        startAutoSlide()
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                nextSlide()
                resetAutoSlide()
            }
            if (e.key === "ArrowLeft") {
                prevSlide()
                resetAutoSlide()
            }
        }

        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return (
        <section className="relative w-full min-h-[91vh] 
                            bg-neutral-800 text-white 
                            flex items-center overflow-hidden">

            {/* BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-r 
                from-black via-white/20 to-transparent z-0" />

            <div className="absolute inset-0 bg-gradient-to-t 
                from-blue-500/25 via-transparent to-transparent z-0" />

            {/* LEFT SIDE */}
            <div className="relative z-10 w-full md:w-1/2 px-8 md:px-20">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    ANNOUNCEMENT FROM US
                </h1>

                <p className="mt-1 text-gray-300 text-lg max-w-lg">
                    จะเปิดรับสมัครเร็ว ๆ นี้
                </p>

                <button
                    onClick={() => document.getElementById('clublist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-6 bg-primary px-8 py-4 rounded-full
                                   text-white font-semibold
                                   hover:scale-105 transition cursor-pointer">
                    Register Now →
                </button>
            </div>

            {/* RIGHT SIDE - SLIDER */}
            <div className="relative z-10 w-full md:w-1/2 h-[85vh]
                            flex items-center justify-center md:-ml-16 overflow-hidden">

                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full flex items-center justify-center"
                        >
                            <img
                                src={slide}
                                alt="poster"
                                className="max-h-[85vh] w-auto object-contain"
                            //drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                            />
                        </div>
                    ))}
                </div>

                {/* NAV BUTTONS */}
                <button
                    onClick={() => { prevSlide(); resetAutoSlide() }}
                    className="absolute left-3 top-1/2 -translate-y-1/2
                        w-12 h-12 rounded-full
                        bg-white/10 backdrop-blur-md
                        text-white text-xl
                        hover:bg-white/20 transition"
                >
                    ‹
                </button>

                <button
                    onClick={() => { nextSlide(); resetAutoSlide() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                        w-12 h-12 rounded-full
                        bg-white/10 backdrop-blur-md
                        text-white text-xl
                        hover:bg-white/20 transition"
                >
                    ›
                </button>

                {/* DOTS */}
                <div className="absolute bottom-8 w-full flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => { setCurrent(index); resetAutoSlide() }}
                            className={`
                                h-2 rounded-full transition-all duration-300
                                ${current === index
                                    ? "w-8 bg-primary"
                                    : "w-3 bg-white/40"}
                            `}
                        />
                    ))}
                </div>

            </div>

        </section>
    )
}
