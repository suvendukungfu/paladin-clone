import { Sidebar } from "@/components/dashboard/Sidebar";
import { BottomNav } from "@/components/dashboard/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-paladin-charcoal text-white overflow-hidden font-inter">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-paladin-gold/5 via-paladin-charcoal to-paladin-charcoal pb-24 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
