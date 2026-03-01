"use client";

import Card from "@/components/Card";
import {
  GraduationCap,
  BookOpen,
  Mail,
  Fingerprint,
  User,
  Building2,
  CalendarDays,
  ShieldCheck,
  Star,
  MapPin,
  ChevronRight,
  Sparkles,
  Activity,
  Trophy
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredClub, setHoveredClub] = useState<string | null>(null);

  // Parallax Setup
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = {
    name: "ชื่อผู้ใช้จาก session",
    studentId: "64xxxxxxxx",
    faculty: "คณะวิศวกรรมศาสตร์",
    major: "สาขาวิศวกรรมเครื่องกล",
    email: "user@example.com",
    joinDate: "สิงหาคม 2023",
  };

  const myClubs = [
    {
      _id: "1",
      club_name: "Dongtan Racing Team",
      location: "ตึกวิศวกรรมเครื่องกล",
      logo_url: "/testpic/dongtaan.png",
      is_open: true,
      description: {
        short: "ทีมแข่งรถของนิสิตวิศวกรรมศาสตร์ที่มีชื่อเสียงในรายการ Formula Student",
      },
      role: "Member",
    },
    {
      _id: "2",
      club_name: "ชมรมดนตรีสากล (Music Club)",
      location: "อาคารกิจกรรม ชั้น 2",
      logo_url: "/testpic/dongtaan.png",
      is_open: false,
      description: {
        short: "พื้นที่สำหรับคนรักเสียงเพลงทุกประเภท",
      },
      role: "Executive",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020418] pb-24 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 overflow-hidden relative transition-colors duration-500">

      {/* --- Ambient Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#070974]/20 dark:from-indigo-600/20 to-blue-300/20 dark:to-purple-800/20 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-[#070974]/15 dark:from-blue-600/15 to-indigo-300/15 dark:to-cyan-800/15 blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-blue-200/20 dark:from-violet-600/20 to-[#070974]/10 dark:to-[#070974]/40 blur-[90px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />

        {/* Subtle grid pattern for dark/light mode */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIi8+CgkJPHBhdGggZD0iTTAgMGg0MHYxbS00MCAzOWg0MCIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KCQk8cGF0aCBkPSJNMCAwdjQwbTM5LTQwdjQwIiBzdHJva2U9InJnYmEoMCwgMCwgMCwgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPgoJPC9zdmc+')] dark:opacity-20 opacity-50"></div>
      </div>

      {/* --- Hero Banner Section with Parallax --- */}
      <motion.div
        style={{ y, scale, opacity }}
        className="relative w-full h-[400px] sm:h-[450px] z-10"
      >
        <div className="absolute inset-0 bg-[#040542] dark:bg-[#01020e] overflow-hidden">
          {/* Animated Gradient Orbs inside Banner */}
          <div className="absolute top-0 left-[20%] w-96 h-96 bg-[#070974]/80 dark:bg-indigo-600/40 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[-20%] right-[10%] w-[30rem] h-[30rem] bg-indigo-500/50 dark:bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
          <div className="absolute top-[-10%] right-[40%] w-[20rem] h-[20rem] bg-blue-600/40 dark:bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[60px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] dark:from-[#020418] via-transparent to-[#040542]/50 dark:to-black/80" />
        </div>
      </motion.div>

      {/* --- Main Content (Bento Grid) --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-[250px] sm:-mt-[280px]">

        {/* Profile Avatar / Identity Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center mb-12"
        >
          {/* Avatar Container with 3D Float effect */}
          <div className="relative shrink-0 flex items-center justify-center transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group">
            {/* Rotating gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#070974] via-blue-500 to-indigo-500 dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500 animate-spin-slow blur-xl opacity-50 dark:opacity-80 scale-[1.15]" style={{ animationDuration: '10s' }} />

            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white dark:bg-slate-900 p-2 z-10 shadow-2xl transition-colors duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#070974] to-blue-800 dark:from-indigo-800 dark:to-purple-900 flex items-center justify-center text-white text-6xl sm:text-7xl font-black shadow-inner overflow-hidden relative group/inner">
                <span className="relative z-10 transform transition-transform duration-500 group-hover/inner:scale-110">{user.name.charAt(0)}</span>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 text-white rounded-full p-2.5 sm:p-3 border-4 border-white dark:border-slate-900 shadow-xl z-20 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer" title="Verified Member">
              <ShieldCheck size={28} className="text-white drop-shadow-md" />
            </div>
          </div>

          {/* User Details */}
          <div className="mt-6 text-center space-y-3 px-4">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#070974]/80 dark:text-indigo-300 font-semibold text-lg">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[#070974] dark:text-indigo-400 text-sm font-bold px-4 py-1.5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-transform hover:scale-105">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#070974] dark:bg-indigo-400 opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#070974] dark:bg-indigo-500"></span>
                </span>
                KU Student
              </div>
              <span className="bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
                <Fingerprint size={16} className="inline mr-1.5 -mt-0.5" />
                {user.studentId}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-max mb-20 block-selection">

          {/* General Info Card (Spans 2 columns on lg) */}
          <BentoItem delay={0.1} className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-900/90 dark:to-slate-900/60 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">ข้อมูลส่วนบุคคล</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <InfoRow icon={<Building2 />} label="Faculty" value={user.faculty} />
              <InfoRow icon={<GraduationCap />} label="Major" value={user.major} />
              <InfoRow icon={<Mail />} label="Email" value={user.email} />
              <InfoRow icon={<CalendarDays />} label="Joined" value={user.joinDate} />
            </div>
          </BentoItem>

          {/* Quick Stats Grid (Spans 1 col, 2 rows) */}
          <BentoItem delay={0.2} className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-[#070974] to-indigo-800 dark:from-indigo-900 dark:to-[#04052e] text-white p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            <div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-indigo-200 font-bold tracking-wider text-sm uppercase">Activity Score</span>
                <Activity size={18} className="text-indigo-300" />
              </div>
              <div className="text-5xl font-black mt-2 mb-1 relative z-10">
                87<span className="text-2xl text-indigo-300">/100</span>
              </div>
              <p className="text-indigo-200 text-sm font-medium relative z-10">อยู่ในเกณฑ์ดีมาก</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-indigo-950/50 rounded-full h-2 mt-8 relative z-10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="bg-emerald-400 h-full rounded-full"
              />
            </div>
          </BentoItem>

          {/* Achievement Summary */}
          <BentoItem delay={0.3} className="md:col-span-3 lg:col-span-1 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4 text-amber-500 shadow-inner">
              <Trophy size={32} className="drop-shadow-sm" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">นักกิจกรรมตัวยง</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">เข้าร่วมกิจกรรมมากกว่า 10 ครั้งในปีการศึกษานี้</p>
          </BentoItem>

          {/* Organizations / Clubs (Spans all columns on large screens) */}
          <BentoItem delay={0.4} className="md:col-span-3 lg:col-span-4 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-10 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                  <Sparkles size={14} className="fill-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Organizations</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ชมรมของฉัน
                </h2>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#070974]/10 dark:bg-indigo-500/20 flex items-center justify-center text-[#070974] dark:text-indigo-400">
                  <Star size={20} className="fill-current opacity-20" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Clubs</p>
                  <p className="text-xl font-black text-[#070974] dark:text-indigo-400 leading-none mt-1">{myClubs.length}</p>
                </div>
              </div>
            </div>

            {myClubs.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 p-16 text-center flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 bg-white dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center">
                  <User size={40} className="text-slate-300 dark:text-slate-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">ยังไม่มีชมรมที่เข้าร่วม</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                    ค้นหาชมรมที่เหมาะกับคุณเพื่อเปิดประสบการณ์ใหม่และพบปะเพื่อนใหม่ ๆ
                  </p>
                </div>
                <button className="mt-2 bg-slate-900 dark:bg-indigo-600 hover:bg-[#070974] dark:hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center gap-2 group/btn">
                  สำรวจชมรม
                  <ChevronRight size={18} className="transform transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myClubs.map((club, index) => (
                  <motion.div
                    key={club._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group/card relative h-full flex flex-col bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#070974]/5 dark:hover:shadow-indigo-900/20 hover:border-slate-300 dark:hover:border-slate-600"
                  >
                    {/* Top Accent Line */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${club.role === 'Executive' ? 'from-amber-400 to-orange-500' : 'from-blue-400 to-[#070974] dark:to-indigo-500'}`} />

                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center p-2 transform transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-3 overflow-hidden shrink-0">
                            <div className="w-full h-full bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-xl text-slate-400">
                              {club.club_name.charAt(0)}
                            </div>
                            <img src={club.logo_url} alt={club.club_name} className="absolute inset-0 w-full h-full object-cover rounded-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover/card:text-[#070974] dark:group-hover/card:text-indigo-400 transition-colors line-clamp-1">
                              {club.club_name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                              <MapPin size={12} className="text-slate-400" />
                              <span className="truncate">{club.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-900/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-700/50 flex-1 flex flex-col space-y-4">
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 line-clamp-3">
                          {club.description.short}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${club.role === 'Executive'
                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${club.role === 'Executive' ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`} />
                            {club.role}
                          </div>

                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${club.is_open ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50'
                            }`}>
                            <div className={`w-1 h-1 rounded-full ${club.is_open ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            {club.is_open ? 'เปิดรับสมัคร' : 'ปิดรับสมัคร'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <button className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover/card:border-[#070974]/30 dark:group-hover/card:border-indigo-500/50 group-hover/card:text-[#070974] dark:group-hover/card:text-indigo-400 px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all w-full group/btn">
                          รายละเอียดพื้นที่กิจกรรม
                          <ChevronRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </BentoItem>

        </div>
      </div>
    </div>
  );
}

// Wrapper for Bento Items with entrance animation
function BentoItem({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-[0_4px_24px_rgb(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgb(0,0,0,0.2)] rounded-[2.5rem] transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Micro-component for info rows
function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">{label}</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{value}</span>
      </div>
    </div>
  );
}
