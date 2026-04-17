"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

const Lanyard = dynamic(() => import("./Lanyard/Lanyard"), { ssr: false });

export default function Register() {
  const { lang, t } = useLang();
  const sectionRef = useReveal<HTMLElement>();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [success, setSuccess] = useState(false);
  const [successNum, setSuccessNum] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [agreeRequired, setAgreeRequired] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const glowAngle = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const canSubmit = email.includes("@") && gender && agreeRequired;

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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), gender, lang }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.error === "duplicate") {
          alert(t("이미 등록된 이메일입니다.", "すでに登録済みのメールです。"));
          setSubmitting(false);
          return;
        }
        throw new Error(data.error || "register_failed");
      }

      setSuccessNum(data.position ?? 1);
      setSuccess(true);
      setEmail("");
      setSubmitting(false);
    } catch (err) {
      console.error("[register] failed:", err);
      alert(t("등록에 실패했습니다. 잠시 후 다시 시도해주세요.", "登録に失敗しました。しばらくしてから再度お試しください。"));
      setSubmitting(false);
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

          {/* Legal consent */}
          <div style={{ margin: "4px 0 18px", textAlign: "left", display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={agreeRequired}
                onChange={(e) => setAgreeRequired(e.target.checked)}
                style={{ marginTop: 2, accentColor: "var(--dp)", width: 14, height: 14, flexShrink: 0 }}
              />
              <span style={{ font: "400 11px/1.55 var(--sans)", color: "var(--ds)" }}>
                <span style={{ color: "#ff6b6b", marginRight: 4 }}>*</span>
                <a href="/legal/terms" target="_blank" rel="noopener noreferrer" style={{ color: "var(--dp)", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  {t("이용약관", "利用規約")}
                </a>
                {t(" 및 ", " および ")}
                <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--dp)", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  {t("개인정보 처리방침", "プライバシーポリシー")}
                </a>
                {t("에 동의하며, 만 19세 이상(일본 거주자는 만 18세 이상)입니다. (필수)", "に同意し、満18歳以上であることを確認します。(必須)")}
              </span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={agreeMarketing}
                onChange={(e) => setAgreeMarketing(e.target.checked)}
                style={{ marginTop: 2, accentColor: "var(--dp)", width: 14, height: 14, flexShrink: 0 }}
              />
              <span style={{ font: "400 11px/1.55 var(--sans)", color: "var(--dt)" }}>
                {t("런칭 소식 및 혜택 안내 수신에 동의합니다. (선택)", "ローンチ情報・特典のお知らせ受信に同意します。(任意)")}
              </span>
            </label>
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

      {/* Success modal — anticipatory */}
      {success && (
        <div
          onClick={() => setSuccess(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "radial-gradient(ellipse at 50% 30%, rgba(30,30,30,.85), rgba(0,0,0,.92))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "fadeUp .4s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 440,
              padding: "28px 24px 32px",
              background: "rgba(10,10,10,.6)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 16,
              textAlign: "center",
              position: "relative",
              boxShadow: "0 30px 80px rgba(0,0,0,.7), 0 0 120px rgba(255,255,255,.03)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setSuccess(false)}
              aria-label="close"
              style={{
                position: "absolute", top: 12, right: 14, width: 32, height: 32,
                border: "none", background: "transparent", color: "var(--dt)",
                cursor: "pointer", fontSize: 22, lineHeight: 1, opacity: 0.5, zIndex: 2,
              }}
            >×</button>

            {/* Eyebrow */}
            <div style={{ font: "600 10px/1 var(--eng)", letterSpacing: 4, textTransform: "uppercase", color: "var(--dt)", marginBottom: 6, marginTop: 4 }}>
              {t("당신의 결", "あなたの結")}
            </div>

            {/* Headline */}
            <h3 style={{ font: "300 22px/1.45 var(--serif)", color: "var(--dp)", marginBottom: 14, letterSpacing: -0.5 }}>
              {t("당신의 인연이 시작되었습니다", "あなたの縁が始まりました")}
            </h3>

            {/* Lanyard card */}
            <div style={{ width: "100%", height: 340, position: "relative", marginBottom: 4 }}>
              <Lanyard memberNumber={successNum} label={t("會員證", "會員證")} />
            </div>

            {/* Hint */}
            <div style={{ font: "400 11px/1.6 var(--sans)", color: "rgba(255,255,255,.32)", marginBottom: 18, letterSpacing: 0.5 }}>
              {t("카드를 잡고 움직여보세요", "カードをつかんで動かしてみてください")}
            </div>

            {/* Meta */}
            <div style={{ padding: "18px 0", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", marginBottom: 20 }}>
              <div style={{ font: "500 10px/1 var(--sans)", letterSpacing: 3, color: "var(--dt)", textTransform: "uppercase", marginBottom: 10 }}>
                {t("창립 회원 번호", "創立会員番号")}
              </div>
              <div style={{ font: "700 32px/1 var(--eng)", color: "var(--dp)", letterSpacing: 2 }}>
                #{String(successNum).padStart(4, "0")}
              </div>
              <div style={{ font: "400 12px/1.6 var(--sans)", color: "var(--ds)", marginTop: 12 }}>
                {t("선착순 500명 중", "先着500名のうち")}
              </div>
            </div>

            {/* Promise */}
            <p style={{ font: "400 13px/1.8 var(--sans)", color: "var(--ds)", marginBottom: 22, padding: "0 8px" }}>
              {t(
                "런칭 당일, 가장 먼저 당신의 프로필이 공개됩니다.",
                "ローンチ当日、最初にあなたのプロフィールが公開されます。"
              )}
              <br />
              <span style={{ color: "var(--dt)", fontSize: 12 }}>
                {t(
                  "등록하신 이메일로 소식을 전해드릴게요.",
                  "ご登録のメールアドレスにお知らせをお届けします。"
                )}
              </span>
            </p>

            <button
              onClick={() => setSuccess(false)}
              style={{
                width: "100%", padding: 15,
                border: "1px solid rgba(255,255,255,.18)", borderRadius: 4,
                background: "transparent", color: "var(--dp)",
                font: "600 11px/1 var(--sans)", letterSpacing: 3,
                cursor: "pointer", transition: ".2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {t("닫기", "閉じる")}
            </button>
          </div>
        </div>
      )}

      <div className="reveal" style={{ marginTop: 32, font: "400 13px/1.6 var(--sans)", color: "var(--dt)", maxWidth: 300, marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 2 }}>
        {t("사전등록은 무료이며, 결제는 발생하지 않습니다.", "事前登録は無料で、決済は発生しません。")}
      </div>
    </section>
  );
}
