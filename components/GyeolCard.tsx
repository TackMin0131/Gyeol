"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLang } from "@/hooks/useLang";

export default function GyeolCard() {
  const { t } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [visible, setVisible] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    setTilt({ rx: (y - 0.5) * -20, ry: (x - 0.5) * 20 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const iconStyle = { width: 16, height: 16, flexShrink: 0, color: "var(--dt)" } as const;
  const rows = [
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>
        </svg>
      ),
      label: t("목적", "目的"),
      value: t("결혼 Only", "結婚 Only"),
    },
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      label: t("신원확인", "身元確認"),
      value: t("5단계 인증", "5段階認証"),
    },
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      ),
      label: t("비용", "費用"),
      value: t("월 19만~", "月¥1.9万~"),
    },
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      label: t("매칭", "マッチング"),
      value: t("가치관 기반 주 3~5명", "価値観ベース 週3~5人"),
    },
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      ),
      label: t("안전", "安全"),
      value: t("만남~귀가 보호", "面会〜帰宅保護"),
    },
    {
      icon: (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      label: t("번역", "翻訳"),
      value: t("실시간 한↔일", "リアルタイム韓↔日"),
    },
  ];

  return (
    <div
      style={{
        perspective: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .7s ease, transform .7s ease",
        position: "relative",
      }}
    >

      <div
        ref={cardRef}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        }}
        onMouseLeave={handleLeave}
        onTouchEnd={handleLeave}
        style={{
          width: "100%",
          maxWidth: 340,
          padding: "36px 28px",
          position: "relative",
          zIndex: 1,
          borderRadius: 8,
          background: "rgba(20,20,20,.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,.08)",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: tilt.rx === 0 ? "transform .5s ease" : "transform .05s ease",
          transformStyle: "preserve-3d",
          cursor: "grab",
          overflow: "hidden",
        }}
      >
        {/* Holographic glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,.12) 0%, transparent 60%)`,
            pointerEvents: "none",
            transition: tilt.rx === 0 ? "background .5s ease" : "none",
          }}
        />

        {/* Animated border glow */}
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 8,
            padding: 1,
            background: "linear-gradient(180deg,rgba(255,255,255,.15),rgba(255,255,255,.02),rgba(255,255,255,.15))",
            mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor" as never,
            animation: "cardGlow 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Lanyard string */}
        <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.05)" }} />
          <svg width="2" height="32" style={{ marginTop: -1 }}>
            <line x1="1" y1="0" x2="1" y2="32" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Card content */}
        <div style={{ textAlign: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
          <div style={{ font: "300 36px/1 var(--serif)", color: "var(--dp)" }}>結</div>
          <div style={{ font: "800 16px/1 var(--eng)", letterSpacing: 6, color: "var(--dp)", marginTop: 14 }}>GYEOL</div>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "13px 0",
              borderTop: "1px solid rgba(255,255,255,.06)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span style={{ font: "500 13px/1 var(--sans)", color: "var(--ds)", display: "flex", alignItems: "center", gap: 8 }}>
              {row.icon}
              {row.label}
            </span>
            <span style={{ font: "700 13px/1 var(--sans)", color: "var(--dp)", textAlign: "right" }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
