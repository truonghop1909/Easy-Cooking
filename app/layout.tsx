import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

export const metadata: Metadata = {
  title: "cooking_app",
  description: "cooking_app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-[#ffffff]">
        <div className="">
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
