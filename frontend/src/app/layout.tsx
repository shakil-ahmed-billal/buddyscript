
 import { Inter, Geist } from "next/font/google";
 import "./globals.css";
 import { Toaster } from "@/components/ui/sonner";
 import { Providers } from "@/components/Providers";
 import { cn } from "@/lib/utils";

 const geist = Geist({subsets:['latin'],variable:'--font-sans'});

 export const metadata = {
   title: "BuddyScript - Feed",
   description: "BuddyScript Feed Design",
   icons: {
     icon: "/favicons/favicon.ico",
   },
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
 