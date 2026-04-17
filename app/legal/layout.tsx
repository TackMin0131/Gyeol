import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: "var(--bk)", color: "var(--dp)", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(0,0,0,.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--sans)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ font: "700 13px/1 var(--eng)", letterSpacing: 4 }}>GYEOL</span>
          <span style={{ font: "400 13px/1 var(--serif)", opacity: 0.5 }}>結</span>
        </Link>
        <nav style={{ display: "flex", gap: 22, fontSize: 12, color: "var(--dt)" }}>
          <Link href="/legal/terms" style={{ color: "inherit", textDecoration: "none" }}>이용약관</Link>
          <Link href="/legal/privacy" style={{ color: "inherit", textDecoration: "none" }}>개인정보처리방침</Link>
        </nav>
      </div>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px 120px", fontFamily: "var(--sans)" }}>
        {children}
      </main>
    </div>
  );
}
