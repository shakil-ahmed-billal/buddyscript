import { FeedMobileNav, FeedNavbar } from "@/components/feed";
import { getSession } from "@/lib/session";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <div className="h-screen bg-bs-bg font-[Poppins,sans-serif] overflow-hidden flex flex-col">
      {/* Top Navbar */}
      <FeedNavbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-[100px] overflow-hidden">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <FeedMobileNav />
    </div>
  );
}
