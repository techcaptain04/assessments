import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import { ReactQueryProvider } from "@/components/providers/react-query";
import "../globals.css";
import { Toaster } from "sonner";
 
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MEDDICC Assessment",
  description: "@jjspscl submission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
      <Toaster />
    </html>
  );
}
