
 import { Inter, Geist } from "next/font/google";
 import "./globals.css";
 import { Toaster } from "@/components/ui/sonner";
 import { Providers } from "@/components/Providers";
 import { cn } from "@/lib/utils";

 const geist = Geist({subsets:['latin'],variable:'--font-sans'});

 export const metadata = {
   title: "Shakil Stack - Full Stack Boilerplate",
   description: "Modern full-stack boilerplate with Next.js, Prisma, and Better-Auth.",
   icons: {
     icon: [
       { url: "/favicons/favicon.ico", sizes: "any" },
       { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
       { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
     ],
     apple: "/favicons/apple-touch-icon.png",
   },
   manifest: "/favicons/site.webmanifest",
 };

 export default async function RootLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return (
     <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
       <body className="font-sans antialiased min-h-screen">
         <Providers>
           {children}
           <Toaster />
         </Providers>
       </body>
     </html>
   );
 }
 