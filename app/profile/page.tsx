"use client";

import Link from "next/link";
import Card from "@/components/Card";
import {
  GraduationCap,
  BookOpen,
  Fingerprint,
  User,
  Building2,
  CalendarDays,
  ShieldCheck,
  Star,
  MapPin,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();

  // Parallax Setup
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/me`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          setMemberships(data.memberships);
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020418] flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020418] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">กรุณาเข้าสู่ระบบ</h1>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020418] pb-24 font-sans selection:bg-indigo-500/30 selection:text-indigo-900 overflow-hidden relative transition-colors duration-500">

      {/* --- Ambient Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Modern Aurora Background (Enhanced Pastel & Opacity) */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-200/90 via-purple-200/80 to-pink-200/80 dark:from-indigo-400/50 dark:via-purple-500/50 dark:to-fuchsia-500/50 blur-[100px] mix-blend-normal opacity-100 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-cyan-200/90 via-teal-200/80 to-emerald-200/80 dark:from-cyan-400/50 dark:via-teal-500/40 dark:to-emerald-500/40 blur-[110px] mix-blend-normal opacity-100 animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[50%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-violet-200/90 to-fuchsia-200/80 dark:from-violet-400/50 dark:to-purple-500/50 blur-[90px] mix-blend-normal opacity-90 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

        {/* Subtle grid pattern with radial fade out */}
        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIi8+CgkJPHBhdGggZD0iTTAgMGg0MHYxbS00MCAzOWg0MCIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KCQk8cGF0aCBkPSJNMCAwdjQwbTM5LTQwdjQwIiBzdHJva2U9InJnYmEoMCwgMCwgMCwgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPgoJPC9zdmc+')] dark:opacity-30 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"></div>

        {/* Floating particles (Enhanced Visibility) */}
        <div className="absolute top-[20%] left-[20%] w-6 h-6 rounded-full bg-indigo-300 dark:bg-indigo-200 blur-[3px] opacity-100 animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[60%] right-[20%] w-8 h-8 rounded-full bg-purple-300 dark:bg-purple-200 blur-[4px] opacity-90 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-4 h-4 rounded-full bg-teal-300 dark:bg-cyan-200 blur-[2px] opacity-100 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2.5s' }}></div>
        <div className="absolute top-[40%] right-[40%] w-5 h-5 rounded-full bg-pink-300 dark:bg-pink-200 blur-[3px] opacity-90 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      {/* --- Hero Banner Section with Parallax --- */}
      <motion.div
        style={{ y, scale, opacity }}
        className="relative w-full h-[400px] sm:h-[450px] z-10 [-webkit-mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"
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
        <BentoItem delay={0.1} className="mb-20 bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-900/90 dark:to-slate-900/60 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">

            <div className="flex flex-col items-center text-center lg:w-1/3">
              <div className="relative shrink-0 flex items-center justify-center transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#070974] via-blue-500 to-indigo-500 dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500 animate-spin-slow blur-xl opacity-50 dark:opacity-80 scale-[1.15]" style={{ animationDuration: '10s' }} />

                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white dark:bg-slate-900 p-2 z-10 shadow-2xl transition-colors duration-500">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#070974] to-blue-800 dark:from-indigo-800 dark:to-purple-900 flex items-center justify-center text-white text-6xl sm:text-7xl font-black shadow-inner overflow-hidden relative group/inner">
                    <span className="relative z-10 transform transition-transform duration-500 group-hover/inner:scale-110">{userProfile.fullname.charAt(0)}</span>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 text-white rounded-full p-2.5 sm:p-3 border-4 border-white dark:border-slate-900 shadow-xl z-20 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer" title="Verified Member">
                  <ShieldCheck size={28} className="text-white drop-shadow-md" />
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
                  {userProfile.fullname} {userProfile.surname}
                </h1>
                <div className="flex flex-col gap-2 items-center text-[#070974]/80 dark:text-indigo-300 font-semibold text-base mt-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[#070974] dark:text-indigo-400 text-sm font-bold px-4 py-1.5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#070974] dark:bg-indigo-400 opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#070974] dark:bg-indigo-500"></span>
                    </span>
                    KU Student
                  </div>
                  <span className="bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
                    <Fingerprint size={16} className="inline mr-1.5 -mt-0.5" />
                    {userProfile.student_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: General Info */}
            <div className="lg:w-2/3 w-full lg:pl-10 lg:border-l border-slate-200 dark:border-slate-700/50 pt-8 lg:pt-0 border-t lg:border-t-0 flex flex-col justify-center my-auto min-h-[250px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">ข้อมูลส่วนบุคคล</h2>
              </div>

              <div className="flex flex-col gap-y-4">
                <InfoRow delay={0.1} icon={<Building2 />} label="Faculty" value={userProfile.faculty} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                  <InfoRow delay={0.2} icon={<GraduationCap />} label="Department" value={userProfile.department} />
                  <InfoRow delay={0.3} icon={<ShieldCheck />} label="Role" value={userProfile.role} />
                </div>
              </div>
            </div>

          </div>
        </BentoItem>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-10 mb-20 block-selection">

          {/* Section: My Clubs (Memberships Only) */}
          <BentoItem delay={0.2} className="bg-white/80 dark:bg-slate-900/80 p-6 sm:p-10 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                  <ShieldCheck size={14} className="fill-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Memberships</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ชมรมของฉัน
                </h2>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Star size={20} className="fill-current opacity-20" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total joined</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none mt-1">{memberships.length}</p>
                </div>
              </div>
            </div>

            {memberships.length === 0 ? (
              <EmptyState message="ยังไม่มีชมรมที่เข้าร่วมในขณะนี้" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memberships.map((club: any, index: number) => (
                  <ClubCard key={club._id} club={club} index={index} />
                ))}
              </div>
            )}
          </BentoItem>

          {/* Section: Applications Status */}
          <BentoItem delay={0.3} className="bg-white/80 dark:bg-slate-900/80 p-6 sm:p-10 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                  <Sparkles size={14} className="fill-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Applications</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  สถานะการสมัคร
                </h2>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Star size={20} className="fill-current opacity-20" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total applied</p>
                  <p className="text-xl font-black text-blue-600 dark:text-blue-400 leading-none mt-1">{applications.length}</p>
                </div>
              </div>
            </div>

            {applications.length === 0 ? (
              <EmptyState message="ไม่มีรายการสมัครที่รอดำเนินการ" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((club: any, index: number) => (
                  <ClubCard key={club._id} club={club} index={index} />
                ))}
              </div>
            )}
          </BentoItem>

        </div>
      </div>
    </div>
  );
}

// Sub-components for better organization
function ClubCard({ club, index }: { club: any, index: number }) {
  const clubSlug = club.slug || club._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative h-full flex flex-col bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 rounded-[2rem] overflow-hidden group/card shadow-sm hover:shadow-xl hover:border-indigo-300/50 dark:hover:border-indigo-500/50 transition-all duration-300"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover/card:from-indigo-500/5 group-hover/card:to-purple-500/5 dark:group-hover/card:from-indigo-500/10 dark:group-hover/card:to-purple-500/10 transition-colors duration-500 pointer-events-none" />
      {/* Top Accent Line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${club.role === 'Executive' ? 'from-amber-400 to-orange-500' :
        club.role === 'Pending' ? 'from-blue-300 to-indigo-300' :
          club.role === 'Rejected' ? 'from-rose-400 to-red-600' :
            'from-blue-400 to-[#070974] dark:to-indigo-500'}`} />

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center p-2 overflow-hidden shrink-0">
              <div className="w-full h-full bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-xl text-slate-400">
                {club.club_name.charAt(0)}
              </div>
              <img src={club.logo_url} alt={club.club_name} className="absolute inset-0 w-full h-full object-cover rounded-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
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
            {club.description?.short || "ไม่มีคำอธิบาย"}
          </p>

          <div className="flex items-center justify-start mt-auto">
            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${club.role === 'Executive'
              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
              : club.role === 'Pending'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                : club.role === 'Rejected'
                  ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50'
                  : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${club.role === 'Executive' ? 'bg-amber-500' : club.role === 'Rejected' ? 'bg-rose-500' : 'bg-blue-500'} animate-pulse`} />
              {club.role}
            </div>
          </div>
        </div>

        <div className="mt-auto relative z-10">
          <Link
            href={`/club/${clubSlug}`}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-300 px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 w-full transition-all duration-300 group/btn2"
          >
            รายละเอียดกิจกรรม
            <ChevronRight size={16} className="transform transition-transform group-hover/btn2:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 p-16 text-center flex flex-col items-center justify-center gap-6 w-full">
      <div className="w-20 h-20 bg-white dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center">
        <User size={40} className="text-slate-300 dark:text-slate-600" />
      </div>
      <div className="space-y-2">
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
          {message}
        </p>
      </div>
    </div>
  );
}

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

function InfoRow({ icon, label, value, delay = 0 }: { icon: React.ReactNode, label: string, value: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + delay }}
      className="flex items-center gap-4 bg-white/40 dark:bg-slate-800/20 hover:bg-white/80 dark:hover:bg-slate-800/50 p-4 rounded-2xl border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/50 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
    >
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 group-hover:scale-110 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5 group-hover:text-indigo-400 transition-colors">{label}</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-900 dark:group-hover:text-white transition-colors">{value}</span>
      </div>
    </motion.div>
  );
}
