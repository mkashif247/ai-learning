import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06070b] mesh-bg">
      <Navbar />
      <Sidebar />
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">{children}</div>
      </main>
    </div>
  );
}
