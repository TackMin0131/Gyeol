"use client";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";

export default function Footer() {
  const { t } = useLang();

  const linkStyle: React.CSSProperties = {
    font: "500 12px/1 var(--sans)",
    color: "rgba(255,255,255,.55)",
    textDecoration: "none",
    letterSpacing: 0.2,
  };
  const sepStyle: React.CSSProperties = {
    color: "rgba(255,255,255,.15)",
    margin: "0 10px",
    font: "500 12px/1 var(--sans)",
  };
  const dataStyle: React.CSSProperties = {
    font: "400 12px/1.8 var(--sans)",
    color: "rgba(255,255,255,.35)",
    letterSpacing: 0.1,
  };
  const dataSep: React.CSSProperties = {
    margin: "0 8px",
    color: "rgba(255,255,255,.15)",
  };

  return (
    <footer
      style={{
        padding: "60px 28px 44px",
        background: "var(--bk)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        {/* Brand */}
        <div style={{ font: "700 16px/1 var(--eng)", color: "var(--dp)", letterSpacing: 6, marginBottom: 26 }}>
          GYEOL
          <span style={{ font: "400 16px/1 var(--serif)", opacity: 0.45, letterSpacing: 2, marginLeft: 8 }}>結</span>
        </div>

        {/* Legal nav — single line, unified font */}
        <div style={{ marginBottom: 22, whiteSpace: "nowrap", overflowX: "auto" }}>
          <Link href="/legal/terms" style={linkStyle}>
            {t("이용약관", "利用規約")}
          </Link>
          <span style={sepStyle}>·</span>
          <Link href="/legal/privacy" style={linkStyle}>
            {t("개인정보처리방침", "プライバシーポリシー")}
          </Link>
          <span style={sepStyle}>·</span>
          <Link href="/legal/terms" style={linkStyle}>
            {t("특정상거래법 표시", "特定商取引法")}
          </Link>
        </div>

        {/* Business info — single line, unified font */}
        <div style={dataStyle}>
          {t("상호 결", "商号 結")}
          <span style={dataSep}>·</span>
          {t("대표 김택민", "代表 金澤民")}
          <span style={dataSep}>·</span>
          {t("사업자등록번호 493-14-02639", "事業者登録番号 493-14-02639")}
          <span style={dataSep}>·</span>
          {t("경기도 광명시 성채로 37", "大韓民国 京畿道 光明市 城菜路37")}
          <span style={dataSep}>·</span>
          <a href="mailto:skyty0131@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
            skyty0131@gmail.com
          </a>
        </div>

        {/* Compliance notice — narrative */}
        <div style={{ font: "400 12px/1.7 var(--sans)", color: "rgba(255,255,255,.28)", marginTop: 20, maxWidth: 520 }}>
          {t(
            "본 서비스는 대한민국 「결혼중개업의 관리에 관한 법률」에 따른 국제결혼중개업 신고를 준비 중이며, 정식 서비스 개시 전 사전등록 단계에 있습니다.",
            "本サービスは大韓民国「結婚仲介業の管理に関する法律」に基づく国際結婚仲介業の届出を準備中であり、正式サービス開始前の事前登録段階にあります。"
          )}
        </div>

        {/* Copyright */}
        <div style={{ font: "400 11px/1 var(--sans)", color: "rgba(255,255,255,.18)", marginTop: 28, letterSpacing: 0.3 }}>
          &copy; 2026 GYEOL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
