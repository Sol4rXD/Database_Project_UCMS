import { News } from "@/components/News";
import Clublist from "@/components/Clublist";
import { AdminFab } from "@/components/AdminFab";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] mt-1 relative">
      <div id="news" className="scroll-mt-20">
        <News />
      </div>
      <div id="clublist" className="scroll-mt-20 min-h-100">
        <Clublist />
      </div>
      <AdminFab />
    </main>
  );
}
