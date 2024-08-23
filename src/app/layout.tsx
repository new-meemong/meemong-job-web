import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styled from "styled-components";
import BaseContainer from "@/components/base-container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "미몽-구인구직",
  description: "헤어 디자이너를 위한 구인구직 서비스"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BaseContainer>{children}</BaseContainer>
      </body>
    </html>
  );
}
