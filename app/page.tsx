import { News } from "@/components/News";
import Clublist from "@/components/Clublist";
import AdminFab from "@/components/AdminFab";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] mt-1 relative pb-60">
      <div id="news" className="scroll-mt-32">
        <News />
      </div>
      <div id="clublist" className="scroll-mt-40 min-h-screen">
        <Clublist />
      </div>
      <AdminFab />
    </main>
  );
}
