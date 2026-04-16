"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks/useLang";

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: scrolled ? 12 : 0,
        left: scrolled ? 16 : 0,
        right: scrolled ? 16 : 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "14px 20px" : "20px 28px",
        mixBlendMode: scrolled ? "normal" : "difference",
        transition: "all .4s cubic-bezier(.4,0,.2,1)",
        background: scrolled ? "rgba(20,20,20,.45)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
        borderRadius: scrolled ? 40 : 0,
        border: scrolled ? "1px solid rgba(255,255,255,.08)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.1)" : "none",
      }}
    >
      <div
        style={{
          font: "700 14px/1 var(--eng)",
          letterSpacing: 6,
          color: "var(--wh)",
        }}
      >
        GYEOL
        <span
          style={{
            font: "400 13px/1 var(--serif)",
            opacity: 0.5,
            marginLeft: 4,
            letterSpacing: 2,
            color: "var(--wh)",
          }}
        >
          結
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {!scrolled && (
          <button
            onClick={toggle}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,.35)",
              borderRadius: 20,
              padding: "6px 16px",
              font: "500 13px/1 var(--sans)",
              cursor: "pointer",
              color: "var(--wh)",
              transition: "all .3s",
            }}
          >
            {lang === "kr" ? "日本語" : "한국어"}
          </button>
        )}
        {scrolled && (
          <a
            href="#register"
            style={{
              padding: "8px 22px",
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "var(--wh)",
              font: "500 13px/1 var(--sans)",
              letterSpacing: 1,
              textDecoration: "none",
              borderRadius: 24,
              transition: "all .3s",
              whiteSpace: "nowrap",
            }}
          >
            {t("사전등록", "事前登録")}
          </a>
        )}
      </div>
    </nav>
  );
}
