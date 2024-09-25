import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styled from "styled-components";
import BaseContainer from "@/components/base-container";
import StyledComponentsRegistry from "./registry";

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
      <head>
        <link rel="icon" href="data:," />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body style={{ margin: 0 }}>
        <StyledComponentsRegistry>
          <BaseContainer>{children}</BaseContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
