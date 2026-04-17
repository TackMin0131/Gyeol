"use client";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const ref = useReveal<HTMLElement>();
  const { t } = useLang();

  return (
    <footer
      ref={ref}
      className="reveal"
      style={{
        padding: "56px 28px 40px",
        background: "var(--bk)",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0" }}>
        {/* Brand */}
        <div style={{ font: "700 12px/1 var(--eng)", color: "var(--dt)", letterSpacing: 5, marginBottom: 22 }}>
          GYEOL
          <span style={{ font: "400 12px/1 var(--serif)", opacity: 0.4, letterSpacing: 2, marginLeft: 6 }}>結</span>
        </div>

        {/* Legal nav — single line */}
        <div style={{ font: "500 11px/1 var(--sans)", letterSpacing: 0.2, marginBottom: 22, whiteSpace: "nowrap", overflowX: "auto" }}>
          <Link href="/legal/terms" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>
            {t("이용약관", "利用規約")}
          </Link>
          <span style={{ color: "rgba(255,255,255,.15)", margin: "0 10px" }}>·</span>
          <Link href="/legal/privacy" style={{ color: "rgba(255,255,255,.75)", textDecoration: "none", fontWeight: 700 }}>
            {t("개인정보처리방침", "プライバシーポリシー")}
          </Link>
          <span style={{ color: "rgba(255,255,255,.15)", margin: "0 10px" }}>·</span>
          <Link href="/legal/terms" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>
            {t("특정상거래법 표시", "特定商取引法")}
          </Link>
        </div>

        {/* Business info */}
        <div style={{ font: "400 12px/1.8 var(--sans)", color: "rgba(255,255,255,.22)" }}>
          <div>
            {t("상호 결", "商号 結")}
            <span style={{ margin: "0 8px", color: "rgba(255,255,255,.12)" }}>·</span>
            {t("대표 김택민", "代表 金澤民")}
            <span style={{ margin: "0 8px", color: "rgba(255,255,255,.12)" }}>·</span>
            {t("사업자등록번호 493-14-02639", "事業者登録番号 493-14-02639")}
          </div>
          <div>{t("경기도 광명시 성채로 37", "大韓民国 京畿道 光明市 城菜路37")}</div>
          <div>
            <a href="mailto:skyty0131@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
              skyty0131@gmail.com
            </a>
          </div>
        </div>

        {/* Compliance notice */}
        <div style={{ font: "400 11px/1.6 var(--sans)", color: "rgba(255,255,255,.16)", marginTop: 18 }}>
          {t(
            "국제결혼중개업 신고 준비 중 · 정식 서비스 개시 전 사전등록 단계",
            "国際結婚仲介業の届出準備中 · 正式サービス開始前の事前登録段階"
          )}
        </div>

        {/* Copyright */}
        <div style={{ font: "400 11px/1 var(--sans)", color: "rgba(255,255,255,.14)", marginTop: 26, letterSpacing: 0.3 }}>
          &copy; 2026 GYEOL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
