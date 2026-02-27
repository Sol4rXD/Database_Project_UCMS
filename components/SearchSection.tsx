import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X, Tag, SortAsc, Check, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: string;
  onSortChange: (sort: any) => void;
  onSearchSubmit?: () => void;
  categories: string[];
}

export default function SearchSection({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onSearchSubmit,
  categories,
}: SearchSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    setHasActiveFilters(selectedCategory !== null || sortBy !== "name_asc");
  }, [selectedCategory, sortBy]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  const sortOptions = [
    { id: "name_asc", label: "ชื่อชมรม (A → Z)" },
    { id: "name_desc", label: "ชื่อชมรม (Z → A)" },
    { id: "status", label: "สถานะ (เปิดรับสมัครก่อน)" },
    { id: "recent", label: "เพิ่มล่าสุด" },
  ];

  return (
    <div className="relative flex items-center gap-3 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex items-center flex-grow group">
        <div className="relative flex-grow">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาชมรมที่สนใจ..."
            className="pl-12 pr-10 h-14 rounded-2xl border-slate-200 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-base focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "h-14 w-14 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 relative",
            isFilterOpen ? "bg-primary text-white border-primary shadow-primary/20" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
            hasActiveFilters && !isFilterOpen && "border-primary/50 text-primary"
          )}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <SlidersHorizontal className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary border-2 border-white rounded-full" />
          )}
        </Button>

        {isFilterOpen && (
          <>
            {/* Backdrop for mobile */}
            <div className="fixed inset-0 z-40 md:hidden bg-slate-900/10 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />

            <div className="absolute right-0 mt-4 w-[320px] rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] border border-slate-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  การกรองชมรม
                </h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category Section */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                  <Tag className="w-3 h-3" />
                  หมวดหมู่ชมรม
                </div>
                <div className="flex flex-wrap gap-2">
                  {["ทั้งหมด", ...categories].map((category) => {
                    const key = category === "ทั้งหมด" ? null : category;
                    const isActive = selectedCategory === key || (category === "ทั้งหมด" && selectedCategory === null);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => onCategoryChange(key)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border",
                          isActive
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                            : "bg-slate-50 text-slate-600 border-transparent hover:border-slate-200 hover:bg-white"
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Section */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                  <SortAsc className="w-3 h-3" />
                  จัดเรียงตาม
                </div>
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onSortChange(option.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                        sortBy === option.id
                          ? "bg-primary/5 text-primary font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {option.label}
                      {sortBy === option.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:bg-slate-50 h-11"
                  onClick={() => {
                    onCategoryChange(null);
                    onSortChange("name_asc");
                  }}
                >
                  ล้างทั้งหมด
                </Button>
                <Button
                  type="button"
                  className="flex-1 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 h-11 shadow-lg shadow-primary/20"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ตกลง
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
