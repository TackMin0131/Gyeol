import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: "var(--bk)", color: "var(--dp)", minHeight: "100vh", fontFamily: "var(--sans)" }}>
      {/* Top bar — brand + close */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(10,10,10,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ font: "700 13px/1 var(--eng)", letterSpacing: 4 }}>GYEOL</span>
          <span style={{ font: "400 13px/1 var(--serif)", opacity: 0.45 }}>結</span>
        </Link>

        <Link
          href="/"
          aria-label="close"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.14)",
            color: "var(--dp)",
            textDecoration: "none",
            transition: "background .2s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Link>
      </header>

      {/* Sub nav — simple tab row */}
      <nav
        style={{
          display: "flex",
          gap: 4,
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,.04)",
          whiteSpace: "nowrap",
          overflowX: "auto",
        }}
      >
        {[
          { href: "/legal/terms", label: "이용약관" },
          { href: "/legal/privacy", label: "개인정보처리방침" },
          { href: "/legal/commerce", label: "특정상거래법 표시" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "8px 12px",
              font: "500 12px/1 var(--sans)",
              color: "rgba(255,255,255,.55)",
              textDecoration: "none",
              borderRadius: 4,
              letterSpacing: 0.2,
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 120px" }}>
        {children}
      </main>
    </div>
  );
}
