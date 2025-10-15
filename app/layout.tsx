"use client"; // This file is now fully client-side

import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { ZoomProvider } from "@/contexts/zoom-context";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";
import { observeScrollAnimations } from "@/lib/scrollAnimationObserver";

// Font import
const inter = Inter({ subsets: ["latin"] });

// Move `QueryClient` instantiation here since it's client-side
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { disconnect } = observeScrollAnimations();

    return () => {
      disconnect();
    };
  }, []);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={false}
            themes={["light", "dark", "divi", "astra", "generatepress", "neve", "kalium"]}
            storageKey="neeom-theme"
          >
            <AuthProvider>
              <ZoomProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <FloatingActions />
                <Toaster />
              </ZoomProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
