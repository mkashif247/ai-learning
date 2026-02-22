import Image from "next/image";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black relative font-sans">
      {/* Universal Background SVG for authenticated routes */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg.svg"
          alt="AI Network Background"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Sidebar />
        <main className="pt-16 lg:pl-64 min-h-screen">
          <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
