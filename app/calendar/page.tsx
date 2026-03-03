"use client";

import { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ChevronLeft, ChevronRight } from "lucide-react";

dayjs.extend(isBetween);

type EventType = {
    title: string;
    start: string;
    end: string;
    club: string;
};

const events: EventType[] = [
    //KU Tech
    { title: "KU Tech Core Team Opening", start: "2026-03-01", end: "2026-03-15", club: "KU Tech" },
    { title: "KU Tech Staff Recruitment (Tech Camp #4)", start: "2026-04-15", end: "2026-04-30", club: "KU Tech" },
    { title: "KU Tech Camp #4 Official Event", start: "2026-07-05", end: "2026-07-06", club: "KU Tech" },
    { title: "KU Tech General Assembly & Orientation", start: "2026-07-24", end: "2026-07-24", club: "KU Tech" },

    //Dongtaan Racing
    { title: "TSAE Auto Challenge 2026", start: "2026-02-05", end: "2026-02-07", club: "Dongtaan Racing" },
    { title: "FSAEJ 2026 Formula Student Competition", start: "2026-09-08", end: "2026-09-13", club: "Dongtaan Racing" },
    { title: "Dongtaan Racing Official Recruitment", start: "2026-05-20", end: "2026-05-30", club: "Dongtaan Racing" },
    { title: "KU Engineering Open House (Dongtaan Booth)", start: "2026-06-14", end: "2026-06-15", club: "Dongtaan Racing" },
    { title: "Official Driver Audition & Selection", start: "2026-06-12", end: "2026-06-18", club: "Dongtaan Racing" },

    //KUMUN
    { title: "KUMUN Conference Delegate Registration", start: "2026-11-11", end: "2026-11-11", club: "KUMUN" },
    { title: "KUMUN Annual Conference 2026", start: "2026-12-11", end: "2026-12-11", club: "KUMUN" },
    { title: "KUMUN x PolSci Conference Registration", start: "2026-08-07", end: "2026-08-16", club: "KUMUN" },
    { title: "KUMUN x PolSci Conference Interview", start: "2026-08-17", end: "2026-08-23", club: "KUMUN" },
    { title: "KUMUN x PolSci Official Announcement", start: "2026-08-24", end: "2026-08-24", club: "KUMUN" },
    { title: "KUMUN x PolSci Conference Day", start: "2026-09-01", end: "2026-09-01", club: "KUMUN" },
    { title: "KUMUN Membership Recruitment & Interview", start: "2026-04-10", end: "2026-05-15", club: "KUMUN" },

    //KU Acoustic
    { title: "KU Acoustic Concert Registration", start: "2026-02-18", end: "2026-02-25", club: "KU Acoustic" },
    { title: "KU Acoustic Annual Concert 2026", start: "2026-02-25", end: "2026-02-25", club: "KU Acoustic" },
    { title: "Waves of Vibes Concert (Official Venue)", start: "2026-03-03", end: "2026-03-03", club: "KU Acoustic" },
    { title: "KU Acoustic Official Audition", start: "2026-08-31", end: "2026-09-12", club: "KU Acoustic" },
    { title: "KU Acoustic Official Orientation", start: "2026-09-19", end: "2026-09-19", club: "KU Acoustic" },
    { title: "KU Acoustic Freshy Festival Performance", start: "2026-07-28", end: "2026-07-28", club: "KU Acoustic" },

    //KU Band
    { title: "KU Band Garden Music @CU 100 Years Park", start: "2026-12-05", end: "2026-12-05", club: "KU Band" },
    { title: "KU Band Freshy Festival Performance", start: "2026-07-28", end: "2026-07-28", club: "KU Band" },
    { title: "KU Band International Day Celebration", start: "2026-02-14", end: "2026-02-14", club: "KU Band" },
    { title: "KU Band x SWU Music Festival", start: "2026-02-25", end: "2026-02-25", club: "KU Band" },
    { title: "KU Band Official Audition 2026", start: "2026-09-20", end: "2026-09-30", club: "KU Band" },

    //Astronomy
    { title: "Astronomy Summer Camp #12 Application", start: "2026-01-03", end: "2026-01-20", club: "Astronomy" },
    { title: "Astronomy Winter Camp #12 Official Event", start: "2026-01-15", end: "2026-01-20", club: "Astronomy" },
    { title: "Astronomy Membership Recruitment", start: "2026-04-01", end: "2026-04-20", club: "Astronomy" },
    { title: "Astronomy Official Orientation", start: "2026-08-01", end: "2026-08-31", club: "Astronomy" },

    //PSC
    { title: "PSC Professional Workshop & Training", start: "2026-11-25", end: "2026-12-20", club: "PSC" },
    { title: "PSC Annual Final Audition", start: "2026-12-21", end: "2026-12-21", club: "PSC" },
    { title: "PSC Initial Round Audition", start: "2026-10-01", end: "2026-10-07", club: "PSC" },
    { title: "PSC Proud to be KU Official Event", start: "2026-06-14", end: "2026-06-15", club: "PSC" },
];

const clubThemes: Record<string, { bg: string, text: string, border: string, dot: string }> = {
    "KU Tech": { bg: "bg-blue-100/90", text: "text-blue-900", border: "border-blue-300", dot: "bg-blue-600" },
    "KU Acoustic": { bg: "bg-pink-100/90", text: "text-pink-900", border: "border-pink-300", dot: "bg-pink-600" },
    "KU Band": { bg: "bg-purple-100/90", text: "text-purple-900", border: "border-purple-300", dot: "bg-purple-600" },
    "Astronomy": { bg: "bg-indigo-100/90", text: "text-indigo-900", border: "border-indigo-300", dot: "bg-indigo-600" },
    "KUMUN": { bg: "bg-emerald-100/90", text: "text-emerald-900", border: "border-emerald-300", dot: "bg-emerald-600" },
    "PSC": { bg: "bg-orange-100/90", text: "text-orange-900", border: "border-orange-300", dot: "bg-orange-600" },
    "Dongtaan Racing": { bg: "bg-red-100/90", text: "text-red-900", border: "border-red-300", dot: "bg-red-600" },
};

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(dayjs("2026-01-01"));

    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const daysInMonth = endOfMonth.date();
    const startDayOfWeek = startOfMonth.day();

    const calendarDays = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(startOfMonth.date(i));
    }
    while (calendarDays.length % 7 !== 0) {
        calendarDays.push(null);
    }

    const nextMonth = () => {
        if (currentMonth.month() === 11) {
            setCurrentMonth(currentMonth.month(0));
        } else {
            setCurrentMonth(currentMonth.add(1, "month"));
        }
    };
    const prevMonth = () => {
        if (currentMonth.month() === 0) {
            setCurrentMonth(currentMonth.month(11));
        } else {
            setCurrentMonth(currentMonth.subtract(1, "month"));
        }
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen font-sans py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-12 items-start">

                <div className="pt-2">
                    <div className="mb-6 border-l-4 border-blue-600 pl-6">
                        <h1
                            className="text-4xl font-bold text-gray-900 leading-none tracking-tighter mb-2"
                        >
                            {currentMonth.format("YYYY")}
                        </h1>
                        <h2 className="text-lg font-bold text-gray-500 flex items-center gap-2">
                            <span>Upcoming</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span
                                className="text-blue-600 uppercase tracking-wider"
                            >
                                {currentMonth.format("MMMM")}
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-4 mt-6">
                        {events
                            .filter(e => {
                                const start = dayjs(e.start);
                                const end = dayjs(e.end);
                                return start.isSame(currentMonth, 'month') ||
                                    end.isSame(currentMonth, 'month') ||
                                    (start.isBefore(currentMonth, 'month') && end.isAfter(currentMonth, 'month'));
                            })
                            .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))
                            .map((e, i) => (
                                <div
                                    key={`${currentMonth.format("MMMM")}-${e.title}-${i}`}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50"
                                >
                                    <div className="text-[10px] text-gray-400 font-medium mb-1">
                                        {dayjs(e.start).format("ddd MMM DD")} – {dayjs(e.end).format("ddd MMM DD, YYYY")}
                                    </div>
                                    <div className="font-bold text-gray-900 text-base leading-tight mb-2">{e.title}</div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${(clubThemes[e.club] || { dot: "bg-gray-400" }).dot}`}></span>
                                        <span className="text-[10px] font-semibold text-gray-500 uppercase">{e.club}</span>
                                    </div>
                                </div>
                            ))}
                        {events.filter(e =>
                            dayjs(e.start).isSame(currentMonth, 'month') ||
                            dayjs(e.end).isSame(currentMonth, 'month') ||
                            (dayjs(e.start).isBefore(currentMonth, 'month') && dayjs(e.end).isAfter(currentMonth, 'month'))
                        ).length === 0 && (
                                <p className="text-gray-400 text-sm">No events this month</p>
                            )}
                    </div>
                </div>
                <div className="col-span-3 bg-white rounded-3xl shadow-[0_10px_50px_rgb(0,0,0,0.04)] p-8 border border-gray-100/80 transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                        <h2
                            className="text-xl font-bold text-[#212529]"
                        >
                            {currentMonth.format("MMMM YYYY")}
                        </h2>

                        <div className="flex bg-[#E9ECEF] rounded-md p-1 gap-1">
                            <button
                                onClick={prevMonth}
                                className="p-1.5 rounded transition-all shadow-sm group hover:bg-white"
                            >
                                <ChevronLeft size={18} className="text-gray-600 group-hover:text-blue-600" />
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-1.5 rounded transition-all shadow-sm group hover:bg-white"
                            >
                                <ChevronRight size={18} className="text-gray-600 group-hover:text-blue-600" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 mb-4 px-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                            <div key={d} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-[#E9ECEF] border border-[#E9ECEF] rounded-xl overflow-hidden">
                        {calendarDays.map((date, index) => (
                            <div
                                key={index}
                                className={`bg-white min-h-[90px] pt-4 relative group hover:bg-[#FBFCFD] transition-colors flex flex-col`}
                            >
                                {date && (
                                    <>
                                        <div className="px-4 mb-2">
                                            <div className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all ${date.isSame(dayjs(), "day")
                                                ? 'bg-blue-100 text-blue-600 shadow-sm'
                                                : 'text-gray-800 group-hover:text-blue-600'
                                                }`}>
                                                {date.date()}
                                            </div>
                                        </div>

                                        <div className="space-y-1 mt-1">
                                            {events.map((event, i) => {
                                                const start = dayjs(event.start);
                                                const end = dayjs(event.end);

                                                if (date.isSame(start, 'day') || (date.isAfter(start, 'day') && date.isBefore(end, 'day')) || date.isSame(end, 'day')) {
                                                    const isStartOfEvent = date.isSame(start, 'day');
                                                    const isEndOfEvent = date.isSame(end, 'day');
                                                    const isStartOfWeek = date.day() === 0;
                                                    const isStartOfMonth = date.date() === 1;
                                                    const showText = isStartOfEvent || isStartOfWeek || isStartOfMonth;

                                                    const diffToEndOfWeek = 6 - date.day();
                                                    const diffToEndOfEvent = end.diff(date, 'day');
                                                    const diffToEndOfMonth = endOfMonth.diff(date, 'day');
                                                    const span = Math.min(diffToEndOfEvent, diffToEndOfWeek, diffToEndOfMonth) + 1;

                                                    const theme = clubThemes[event.club] || { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };

                                                    if (isStartOfEvent || isStartOfWeek || isStartOfMonth) {
                                                        const endDateOfSegment = date.add(span - 1, 'day');
                                                        return (
                                                            <div
                                                                key={i}
                                                                className={`h-7 text-[11px] font-bold px-2 flex items-center gap-1.5 z-10 transition-all hover:brightness-90
                                                                    rounded ml-2 mr-2
                                                                    ${theme.bg} ${theme.text} border ${theme.border}`}
                                                                style={{
                                                                    width: `calc(${span}00% + ${(span - 1)}px - 16px)`,
                                                                    position: 'relative'
                                                                }}
                                                            >
                                                                {isStartOfEvent && (
                                                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme.dot}`}></span>
                                                                )}
                                                                {showText && <span className="truncate whitespace-nowrap">{event.title}</span>}
                                                            </div>
                                                        );
                                                    }
                                                    return <div key={i} className="h-7" />;
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
