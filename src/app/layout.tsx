import type { Metadata, Viewport } from "next";
import "./globals.css";
import BaseContainer from "@/components/base-container";
import StyledComponentsRegistry from "./registry";
import Script from "next/script";

export const metadata: Metadata = {
  title: "미몽-구인구직",
  description: "헤어 디자이너를 위한 구인구직 서비스 ~!"
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0
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
        {/* <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /> */}
      </head>
      <body style={{ margin: "0 auto", maxWidth: "600px" }}>
        <StyledComponentsRegistry>
          <BaseContainer>{children}</BaseContainer>
        </StyledComponentsRegistry>
        <Script id="send-message-to-flutter" strategy="afterInteractive">
          {`
            function startChat(message) {
              if (window.Event) {
                window.Event.postMessage(JSON.stringify(message));
              } else {
                console.log("Event channel is not available.");
              }
            }
            window.startChat = startChat;

            function GoBack() {
              if(window.GoBack) {
                window.GoBack.postMessage('');
              } else {
               console.log("GoBack channel is not available.");}
            }

            window.GoBack = GoBack;

            function externalLink(url){
              if(window.ExternalLink) {
                window.ExternalLink.postMessage(JSON.stringify(url));
              } else {
                console.log("ExternalLink channel is not available.");
              }
            }

            window.externalLink = externalLink;
          `}
        </Script>
      </body>
    </html>
  );
}
