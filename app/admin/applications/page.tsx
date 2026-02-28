"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Check, X, Clock, User, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
    id: number;
    user_id: number;
    club_id: string;
    status: "PENDING" | "APPROVE" | "REJECT";
    create_at: string;
    user: {
        fullname: string;
        student_id: string;
        department: string;
    };
}

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appsRes, clubsRes] = await Promise.all([
                    axios.get("/api/clubapply?status=PENDING"),
                    axios.get("/api/club")
                ]);
                setApplications(appsRes.data);
                setClubs(clubsRes.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                toast.error("Failed to load applications");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleUpdateStatus = async (id: number, newStatus: "APPROVE" | "REJECT") => {
        try {
            await axios.patch(`/api/clubapply/${id}`, { status: newStatus });
            setApplications(prev => prev.filter(app => app.id !== id));
            toast.success(`Application ${newStatus === "APPROVE" ? "approved" : "rejected"} successfully`);
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error("Failed to update application status");
        }
    };

    const getClubName = (id: string) => {
        return clubs.find(c => c._id === id)?.club_name || id;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                <p className="text-slate-400 font-medium">กำลังโหลดข้อมูลสถานะการสมัคร...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <Clock className="w-8 h-8 text-blue-600" />
                        จัดการการสมัครเข้าชมรม
                        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                            {applications.length} รายการรอดำเนินการ
                        </span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">อนุมัติหรือปฏิเสธคำขอเข้าชมรมของนิสิตจากหน้านี้</p>
                </div>

                {applications.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center shadow-sm border border-slate-100">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">ไม่มีรายการรอดำเนินการ</h3>
                        <p className="text-slate-400 mt-2">คำขอสมัครทั้งหมดได้รับการตรวจสอบเรียบร้อยแล้ว</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-shadow">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ผู้สมัคร</p>
                                            <p className="font-bold text-slate-900">{app.user.fullname}</p>
                                            <p className="text-sm text-slate-500">รหัสนิสิต: {app.user.student_id}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                                            <Building2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ชมรมที่สมัคร</p>
                                            <p className="font-bold text-slate-900">{getClubName(app.club_id)}</p>
                                            <p className="text-sm text-slate-500">{app.user.department}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                                            <Calendar className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">วันที่สมัคร</p>
                                            <p className="font-bold text-slate-900">
                                                {new Date(app.create_at).toLocaleDateString("th-TH", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                เวลา {new Date(app.create_at).toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' })} น.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                                    <Button
                                        onClick={() => handleUpdateStatus(app.id, "REJECT")}
                                        variant="outline"
                                        className="flex-1 md:flex-none h-12 px-6 rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-bold"
                                    >
                                        <X className="w-5 h-5 mr-2" />
                                        ปฏิเสธ
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateStatus(app.id, "APPROVE")}
                                        className="flex-1 md:flex-none h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        อนุมัติ
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
