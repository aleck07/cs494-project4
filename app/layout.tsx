import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ProfileContextProvider } from "@/context/profileContext";

export const metadata: Metadata = {
  title: "Projet 4 - CS494",
  description: "Project 4 for Dan's hardest class, CS494!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ProfileContextProvider> {children} </ProfileContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
