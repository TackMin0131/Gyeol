"use client";
import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const ref = useReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="reveal"
      style={{
        padding: "48px 28px 40px",
        textAlign: "center",
        background: "var(--bk)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ font: "700 13px/1 var(--eng)", color: "var(--dt)", letterSpacing: 6, marginBottom: 24 }}>
        GYEOL{" "}
        <span style={{ font: "400 13px/1 var(--serif)", opacity: 0.4, letterSpacing: 2 }}>結</span>
      </div>
      <div style={{ font: "400 13px/1.7 var(--sans)", color: "rgba(255,255,255,.18)", maxWidth: 320, margin: "0 auto" }}>
        <span>상호 결</span>
        <span style={{ margin: "0 4px", color: "rgba(255,255,255,.1)" }}> · </span>
        <span>대표 김택민</span>
        <br />
        <span>사업자등록번호 493-14-02639</span>
        <br />
        <span>경기도 광명시 성채로 37</span>
        <br />
        <span>contact@gyeol.com</span>
      </div>
      <div style={{ font: "400 13px/1 var(--sans)", color: "rgba(255,255,255,.12)", marginTop: 20 }}>
        &copy; 2026 GYEOL. All rights reserved.
      </div>
    </footer>
  );
}
