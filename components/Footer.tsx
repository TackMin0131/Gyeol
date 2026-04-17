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

      {/* Legal nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <Link href="/legal/terms" style={{ font: "500 12px/1 var(--sans)", color: "rgba(255,255,255,.5)", textDecoration: "none", letterSpacing: 0.3 }}>
          {t("이용약관", "利用規約")}
        </Link>
        <span style={{ color: "rgba(255,255,255,.1)" }}>·</span>
        <Link href="/legal/privacy" style={{ font: "700 12px/1 var(--sans)", color: "rgba(255,255,255,.7)", textDecoration: "none", letterSpacing: 0.3 }}>
          {t("개인정보처리방침", "プライバシーポリシー")}
        </Link>
        <span style={{ color: "rgba(255,255,255,.1)" }}>·</span>
        <Link href="/legal/terms#japan" style={{ font: "500 12px/1 var(--sans)", color: "rgba(255,255,255,.5)", textDecoration: "none", letterSpacing: 0.3 }}>
          {t("특정상거래법 표시", "特定商取引法に基づく表記")}
        </Link>
      </div>

      <div style={{ font: "400 13px/1.7 var(--sans)", color: "rgba(255,255,255,.18)", maxWidth: 380, margin: "0 auto" }}>
        <span>{t("상호 결", "商号 結")}</span>
        <span style={{ margin: "0 4px", color: "rgba(255,255,255,.1)" }}> · </span>
        <span>{t("대표 김택민", "代表 金澤民")}</span>
        <br />
        <span>{t("사업자등록번호 493-14-02639", "事業者登録番号 493-14-02639")}</span>
        <br />
        <span>{t("경기도 광명시 성채로 37", "大韓民国 京畿道 光明市 城菜路37")}</span>
        <br />
        <a href="mailto:skyty0131@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>skyty0131@gmail.com</a>
      </div>
      <div style={{ font: "400 11px/1.6 var(--sans)", color: "rgba(255,255,255,.14)", marginTop: 18, maxWidth: 460, margin: "18px auto 0", padding: "0 12px" }}>
        {t(
          "본 서비스는 대한민국 「결혼중개업의 관리에 관한 법률」에 따른 국제결혼중개업 신고를 준비 중이며, 정식 서비스 개시 전 사전등록 단계입니다.",
          "本サービスは大韓民国「結婚仲介業の管理に関する法律」に基づく国際結婚仲介業の届出を準備中であり、正式サービス開始前の事前登録段階です。"
        )}
      </div>
      <div style={{ font: "400 13px/1 var(--sans)", color: "rgba(255,255,255,.12)", marginTop: 20 }}>
        &copy; 2026 GYEOL. All rights reserved.
      </div>
    </footer>
  );
}
