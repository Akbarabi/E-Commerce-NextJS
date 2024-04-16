import type { Metadata } from "next";
import { Inter } from "next/font/google";

import LeftSideBar from "@/components/layout/LeftSideBar";
import { ToastProvider } from "@/lib/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product",
  description: "Monsell product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <div className="flex-1 px-10">{children}</div>
          </div>
        </body>
      </html>
  );
}