"use client";

import Card from "@/components/Card";

export default function ProfilePage() {
  const user = {
    name: "ชื่อผู้ใช้จาก session",
    studentId: "64xxxxxxxx",
    faculty: "คณะวิศวกรรมศาสตร์",
    major: "สาขาวิศวกรรมเครื่องกล",
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
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section className="bg-white rounded-3xl shadow-lg px-8 py-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-600">
              รหัสนิสิต {user.studentId}
            </p>
            <p className="text-sm text-slate-600">
              {user.faculty} · {user.major}
            </p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1">
              Logged in with session
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">ชมรมของฉัน</h2>
            <p className="text-sm text-slate-500">
              ทั้งหมด {myClubs.length} ชมรม
            </p>
          </div>

          {myClubs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-inner px-6 py-10 text-center text-slate-500 text-sm">
              ตอนนี้ยังไม่ได้เข้าร่วมชมรมใด ลองค้นหาชมรมที่สนใจแล้วสมัครเข้าร่วมได้เลย
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myClubs.map((club) => (
                <Card
                  key={club._id}
                  name={club.club_name}
                  location={club.location}
                  imageSrc={club.logo_url}
                  status={club.is_open ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
                  description={club.description.short}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

