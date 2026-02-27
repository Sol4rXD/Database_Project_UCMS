"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import SearchSection from "./SearchSection"

export default function Clublist() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/club");
        setClubs(response.data);
      } catch (error) {
        console.error("Fail to fetch: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return <p className="text-center py-10">Starting...</p>;

  const filteredClubs = clubs.filter((club: any) =>
    club.club_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="py-10 mt-15">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-900">
            รายชื่อชมรม
          </h1>

          <div className="flex-shrink-0">
            <SearchSection
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 items-start">
          {filteredClubs.map((club: any) => (
            <Card
              key={club._id}
              name={club.club_name}
              location={club.location}
              imageSrc={club.logo_url}
              isOpen={club.is_open}
              description={club.description.short}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
