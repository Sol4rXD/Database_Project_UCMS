import { News } from "@/components/News";
import Clublist from "@/components/Clublist";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] mt-1">
      <News/>
      <Clublist/>
    </main>
  );
}
