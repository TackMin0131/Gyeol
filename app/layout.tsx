import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GYEOL 結 — 진짜를 만나다",
  description: "결혼만을 위한 한일 프리미엄 매칭 플랫폼.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@200;300;400;500;600;700;800;900&family=Noto+Serif+KR:wght@300;400;600;700&family=Noto+Serif+JP:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
