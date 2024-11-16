import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";
import { AccountLayout } from "./components/Layout/AccountLayout";
import { Menu } from "./components/Layout/Menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Encode Bootcamp Deposits",
  description: "Deposit for Encode Bootcamps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AccountLayout>
          <div className="min-h-screen">
            <Menu />
              {children}
            </div>
          </AccountLayout>
        </Providers>
      </body>
    </html>
  );
}
