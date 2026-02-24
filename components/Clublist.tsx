"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 
import Card from "./Card";

export default function Clublist() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/club");
        setClubs(response.data); 
      } catch (error) {
        console.error("ดึงข้อมูลไม่มาว่ะเฮีย:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return <p className="text-center py-10">Starting...</p>;

  return (
    <div className="py-10"> 
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          รายชื่อชมรม
        </h1>
        <div className="grid grid-cols-2 gap-6 items-start">
          {clubs.map((club: any) => (
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
      </div>
    </div>
  );
}
