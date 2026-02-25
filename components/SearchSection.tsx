import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export default function SearchSection({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: SearchSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name_asc" | "name_desc" | "status" | "recent">("name_asc");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <div className="relative flex items-center gap-3">
      <form onSubmit={handleSubmit} className="flex items-center flex-grow">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาชมรม"
            className="pl-12 pr-4 h-14 rounded-full border-none shadow-md bg-white text-lg focus-visible:ring-1 focus-visible:ring-gray-200"
          />
        </div>
      </form>

      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-14 w-14 rounded-2xl bg-white shadow-md hover:bg-gray-50 transition-all cursor-pointer"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <SlidersHorizontal className="w-6 h-6 text-gray-600" />
        </Button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-gray-100 p-4 z-20">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">หมวดหมู่ชมรม</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["ทั้งหมด", "กีฬา", "ดนตรี", "วิชาการ", "จิตอาสา"].map((category) => {
                const key = category === "ทั้งหมด" ? null : category;
                const isActive = selectedCategory === key || (category === "ทั้งหมด" && selectedCategory === null);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-blue-400"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <h3 className="text-sm font-semibold text-gray-800 mb-2">Sort by</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  className="accent-blue-600"
                  checked={sortBy === "name_asc"}
                  onChange={() => setSortBy("name_asc")}
                />
                <span>ชื่อชมรม (A → Z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  className="accent-blue-600"
                  checked={sortBy === "name_desc"}
                  onChange={() => setSortBy("name_desc")}
                />
                <span>ชื่อชมรม (Z → A)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  className="accent-blue-600"
                  checked={sortBy === "status"}
                  onChange={() => setSortBy("status")}
                />
                <span>สถานะ (เปิดรับสมัครก่อน)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  className="accent-blue-600"
                  checked={sortBy === "recent"}
                  onChange={() => setSortBy("recent")}
                />
                <span>เพิ่มล่าสุด</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="ghost"
                className="h-9 px-3 text-xs text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSelectedCategory(null);
                  setSortBy("name_asc");
                }}
              >
                ล้างตัวกรอง
              </Button>
              <Button
                type="button"
                className="h-9 px-4 rounded-full bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                onClick={() => setIsFilterOpen(false)}
              >
                ใช้ตัวกรอง
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
