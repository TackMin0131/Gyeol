"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

const SHEET_URL = "YOUR_APPS_SCRIPT_URL_HERE";

export default function Register() {
  const { lang, t } = useLang();
  const sectionRef = useReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [success, setSuccess] = useState(false);
  const [successNum, setSuccessNum] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const glowAngle = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const canSubmit = email.includes("@") && gender;

  // Glow rotation
  useEffect(() => {
    let id: number;
    function animate() {
      glowAngle.current = (glowAngle.current + 1) % 360;
      if (btnRef.current) btnRef.current.style.setProperty("--glow-angle", glowAngle.current + "deg");
      id = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(id);
  }, []);

  // Default gender by lang
  useEffect(() => {
    if (!gender) {
      setGender(lang === "kr" ? "M" : "F");
    }
  }, [lang, gender]);

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({ email, gender, lang }),
        headers: { "Content-Type": "text/plain" },
      });
      const data = await res.json();
      if (data.result === "duplicate") {
        alert(t("이미 등록된 이메일입니다.", "すでに登録済みのメールです。"));
        setSubmitting(false);
        return;
      }
      setSuccessNum(data.count);
      setSuccess(true);
    } catch {
      setSuccessNum(500);
      setSuccess(true);
    }
  }

  const genderButtons = lang === "kr"
    ? [{ flag: "KR", label: t("한국 남성", "韓国人男性"), value: "M" }, { flag: "JP", label: t("일본 여성", "日本人女性"), value: "F" }]
    : [{ flag: "JP", label: t("일본 여성", "日本人女性"), value: "F" }, { flag: "KR", label: t("한국 남성", "韓国人男性"), value: "M" }];

  return (
    <section
      ref={sectionRef}
      id="register"
      style={{
        padding: "80px 36px 100px",
        background: "var(--bk)",
        color: "var(--dp)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "120%", height: "30%", background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.15),transparent 65%)", pointerEvents: "none", zIndex: 1, animation: "glowBreath 6s ease-in-out infinite" }} />

      {/* Rays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", width: "200vmax", height: "200vmax", transformOrigin: "top center", transform: "translateX(-50%)", animation: "raysRotate 25s linear infinite",
          background: "conic-gradient(from 0deg at 50% 0%,transparent 0deg,rgba(255,255,255,.05) 4deg,rgba(255,255,255,.14) 12deg,rgba(255,255,255,.05) 22deg,transparent 30deg,transparent 55deg,rgba(255,255,255,.04) 60deg,rgba(255,255,255,.12) 72deg,rgba(255,255,255,.04) 84deg,transparent 92deg,transparent 130deg,rgba(255,255,255,.05) 136deg,rgba(255,255,255,.15) 150deg,rgba(255,255,255,.05) 164deg,transparent 172deg,transparent 210deg,rgba(255,255,255,.04) 216deg,rgba(255,255,255,.11) 228deg,rgba(255,255,255,.04) 240deg,transparent 248deg,transparent 295deg,rgba(255,255,255,.05) 302deg,rgba(255,255,255,.1) 314deg,rgba(255,255,255,.05) 326deg,transparent 334deg,transparent 360deg)",
          filter: "blur(10px)",
        }} />
      </div>

      {/* 結 watermark */}
      <div style={{ position: "absolute", font: "700 50vw/1 var(--serif)", color: "rgba(255,255,255,.012)", bottom: "-15%", right: "-5%", pointerEvents: "none", userSelect: "none" }}>結</div>

      <div className="s-title reveal" style={{ color: "var(--dp)", marginBottom: 36, position: "relative", zIndex: 2, lineHeight: 1.5 }}
        dangerouslySetInnerHTML={{ __html: t("지금 등록하면,<br>가장 먼저 만납니다.", "今登録すれば、<br>最初に出会えます。") }}
      />

      {/* Urgency */}
      <div className="reveal" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", padding: "16px 36px", marginBottom: 28, position: "relative", zIndex: 2 }}>
        <span style={{
          content: "''", position: "absolute", inset: -1, padding: 1,
          background: "linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.03),rgba(255,255,255,.15))",
          mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude", WebkitMaskComposite: "xor" as never,
          animation: "borderGlow 3s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div style={{ font: "800 22px/1.3 var(--sans)", color: "var(--dp)" }}>{t("선착순 500명", "先着500名")}</div>
        <div style={{ font: "400 13px/1 var(--sans)", color: "var(--dt)", letterSpacing: 1, marginTop: 10 }}>{t("등록 완료 시 조기 마감", "定員に達し次第、受付終了")}</div>
      </div>

      {/* Benefits */}
      <div className="reveal" style={{ maxWidth: 340, margin: "0 auto 28px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ padding: "16px 0", font: "500 13px/1.6 var(--sans)", color: "var(--ds)" }}>
          <span style={{ font: "700 16px/1 var(--sans)", color: "var(--dt)", textDecoration: "line-through" }}>{t("₩390,000/월", "プレミアムプラン")}</span>
          <span style={{ color: "var(--dt)", margin: "0 8px", fontSize: 14 }}>&rarr;</span>
          <span style={{ font: "800 18px/1 var(--sans)", color: "var(--dp)" }}>{t("1개월 무료", "3ヶ月無料")}</span>
        </div>
        <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.06)", font: "500 13px/1 var(--sans)", color: "var(--ds)" }}>{t("런칭 당일 1순위 프로필 노출", "ローンチ当日 最優先プロフィール表示")}</div>
        <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.06)", font: "500 13px/1 var(--sans)", color: "var(--ds)" }}>{t("사전 인증 → 즉시 매칭", "事前認証 → 即時マッチング")}</div>
      </div>

      {/* Form */}
      {!success ? (
        <div
          className="reveal"
          style={{
            maxWidth: 340,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            padding: "28px 22px",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 12,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Email field group */}
          <div style={{ marginBottom: 24, textAlign: "left" }}>
            <div style={{ font: "500 11px/1 var(--sans)", color: "var(--dt)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
              {t("이메일", "メール")}
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("your@email.com", "your@email.com")}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 4,
                  background: "rgba(0,0,0,.4)",
                  color: "var(--dp)",
                  font: "400 14px/1 var(--sans)",
                  outline: "none",
                  transition: ".3s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}
              />
            </div>
          </div>

          {/* Visual divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)", margin: "0 -22px 24px" }} />

          {/* Gender selection group */}
          <div style={{ textAlign: "left" }}>
            <div style={{ font: "500 11px/1 var(--sans)", color: "var(--dt)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
              {t("국적 · 성별", "国籍 · 性別")}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              {genderButtons.map((g) => (
                <div
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  style={{
                    flex: 1,
                    padding: "16px 12px",
                    border: `1px solid ${gender === g.value ? "var(--dp)" : "rgba(255,255,255,.15)"}`,
                    borderRadius: 4,
                    background: gender === g.value ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.4)",
                    cursor: "pointer",
                    transition: ".3s",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ font: "700 14px/1 var(--sans)", color: gender === g.value ? "var(--dp)" : "var(--dt)" }}>{g.flag}</span>
                  <span style={{ font: "600 13px/1 var(--sans)", color: gender === g.value ? "var(--dp)" : "var(--dt)", transition: ".3s" }}>{g.label}</span>
                </div>
              ))}
            </div>
            <div
              style={{ font: "400 12px/1.5 var(--sans)", color: "rgba(255,255,255,.35)", textAlign: "center", marginBottom: 20, marginTop: 14 }}
              dangerouslySetInnerHTML={{ __html: t("<em style='font-style:normal;color:var(--ds)'>한국 남성 × 일본 여성</em> 매칭에 특화된 서비스입니다", "<em style='font-style:normal;color:var(--ds)'>韓国人男性 × 日本人女性</em> マッチングに特化したサービスです") }}
            />
          </div>

          <button
            ref={btnRef}
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            style={{
              width: "100%", padding: 20, border: "none", borderRadius: 4, background: "var(--wh)", color: "var(--bk)",
              font: "700 13px/1 var(--sans)", letterSpacing: 3, cursor: canSubmit ? "pointer" : "not-allowed",
              transition: ".3s", position: "relative", overflow: "visible",
              opacity: canSubmit && !submitting ? 1 : 0.35,
            }}
          >
            {submitting ? t("등록 중...", "登録中...") : t("사전등록", "事前登録")}
          </button>
        </div>
      ) : (
        <div style={{ padding: "40px 0", position: "relative", zIndex: 2 }}>
          <h3 style={{ font: "700 22px/1.35 var(--sans)", marginBottom: 20 }}>{t("등록이 완료되었습니다.", "登録が完了しました。")}</h3>
          <p style={{ font: "400 14px/1.6 var(--sans)", color: "var(--ds)" }}>
            <strong style={{ color: "var(--dp)", fontWeight: 700, fontSize: 20 }}>{successNum}</strong>
            {t("번째 회원.", "番目の会員。")}
            <br /><br />
            {t("런칭 시 가장 먼저 찾아뵙겠습니다.", "ローンチ時に最初にお届けします。")}
          </p>
        </div>
      )}

      <div className="reveal" style={{ marginTop: 32, font: "400 13px/1.6 var(--sans)", color: "var(--dt)", maxWidth: 300, marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 2 }}>
        {t("사전등록은 무료이며, 결제는 발생하지 않습니다.", "事前登録は無料で、決済は発生しません。")}
      </div>
    </section>
  );
}
