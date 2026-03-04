"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import SearchSection from "./SearchSection"

export default function Clublist() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name_asc" | "name_desc" | "status" | "recent">("name_asc");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/club");
        const data = response.data;
        setClubs(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((club: any) => club.club_category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Fail to fetch: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return <p className="text-center py-10">Starting...</p>;

  const filteredClubs = clubs
    .filter((club: any) => {
      const matchesSearch = club.club_name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const matchesCategory = selectedCategory
        ? club.club_category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "name_asc") {
        return a.club_name.localeCompare(b.club_name);
      } else if (sortBy === "name_desc") {
        return b.club_name.localeCompare(a.club_name);
      } else if (sortBy === "status") {
        // OPEN (true) comes before CLOSED (false)
        if (a.is_open === b.is_open) return 0;
        return a.is_open ? -1 : 1;
      } else if (sortBy === "recent") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-900">
            รายชื่อชมรม
          </h1>

          <div className="flex-shrink-0">
            <SearchSection
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categories={categories}
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
              description={club.description?.short || ""}
              slug={club.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
