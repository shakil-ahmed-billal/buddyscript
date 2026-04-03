import { FeedMobileNav, FeedNavbar, ThemeToggle } from "@/components/feed";
import { getSession } from "@/lib/session";
import { ThemeProvider } from "@/components/theme-provider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="h-screen bg-bs-bg font-[Poppins,sans-serif] overflow-hidden flex flex-col transition-colors duration-300">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Top Navbar */}
        <FeedNavbar />

        {/* Main Content Area */}
        <main className="flex-1 pt-[100px] overflow-hidden">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <FeedMobileNav />
      </div>
    </ThemeProvider>
  );
}
