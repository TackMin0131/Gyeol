"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/hooks/useLang";
import { getTodayCount } from "@/lib/fakeCounter";

const Silk = dynamic(() => import("./Silk/Silk.jsx"), { ssr: false });

export default function Hero() {
  const { t } = useLang();
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [silkVisible, setSilkVisible] = useState(true);

  // Counter: animate 0 → today's KST count, then silently update every minute
  // (so the hourly bump appears if the user leaves the tab open)
  useEffect(() => {
    const initial = getTodayCount().total;
    const timer = setTimeout(() => {
      let cur = 0;
      const frame = () => {
        if (cur < initial) {
          cur++;
          setCount(cur);
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
    }, 1200);

    const interval = setInterval(() => {
      setCount(getTodayCount().total);
    }, 60_000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Pause Silk WebGL when Hero is out of view to save GPU
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setSilkVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "100px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const headline = t("결국 만나야 할 사람", "結局、出会うべき人");

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100svh",
        minHeight: 640,
        display: "grid",
        gridTemplateRows: "1fr auto",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 120,
        paddingBottom: 0,
        background: "var(--bk)",
        color: "var(--dp)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Silk background (monochrome) - paused when out of view */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, visibility: silkVisible ? "visible" : "hidden" }}>
        {silkVisible && (
          <Silk
            speed={4}
            scale={1}
            color="#2a2a2a"
            noiseIntensity={1.5}
            rotation={0}
          />
        )}
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "0 24px", maxWidth: "100%", width: "100%", alignSelf: "center" }}>
        {/* Category eyebrow — marriage matching platform */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 14px",
            marginBottom: 24,
            border: "1px solid rgba(255,255,255,.14)",
            borderRadius: 999,
            background: "rgba(255,255,255,.03)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            opacity: 0,
            animation: "fadeUp .8s ease .2s forwards",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff6b6b", boxShadow: "0 0 8px #ff6b6b" }} />
          <span style={{ font: "600 10.5px/1 var(--sans)", letterSpacing: 2, color: "var(--ds)", textTransform: "uppercase" }}>
            {t("한・일 국제결혼 중개 플랫폼", "日韓国際結婚仲介プラットフォーム")}
          </span>
        </div>

        <h1
          style={{
            font: "800 30px/1.5 var(--sans)",
            letterSpacing: -0.5,
            marginBottom: 24,
            opacity: 0,
            animation: "fadeUp .8s ease .5s forwards",
            maxWidth: 340,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 4,
          }}
        >
          <span
            style={{
              display: "inline",
              padding: "4px 0",
              background:
                "linear-gradient(120deg,var(--dp) 0%,var(--dp) 40%,rgba(255,255,255,.45) 50%,var(--dp) 60%,var(--dp) 100%)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shinySlide 3.5s ease-in-out infinite 2s",
            }}
          >
            {headline}
          </span>
        </h1>

        <p
          style={{
            font: "400 14px/1.65 var(--sans)",
            color: "var(--ds)",
            maxWidth: 300,
            margin: "0 auto 52px",
            opacity: 0,
            animation: "fadeUp .8s ease 1s forwards",
          }}
          dangerouslySetInnerHTML={{
            __html: t(
              "한국 남성 × 일본 여성<br>검증된 사람만, 결혼만을 위한 매칭.",
              "韓国人男性 × 日本人女性<br>検証された人だけ、結婚だけのマッチング。"
            ),
          }}
        />

        <div style={{ opacity: 0, animation: "fadeUp .8s ease 1.3s forwards", marginBottom: 32 }}>
          <a
            href="#register"
            style={{
              position: "relative",
              display: "inline-block",
              padding: "17px 56px",
              font: "600 13px/1 var(--eng)",
              letterSpacing: 3,
              color: "var(--dp)",
              textDecoration: "none",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            <span
              style={{
                content: "''",
                position: "absolute",
                inset: -1,
                borderRadius: 4,
                padding: 1,
                background:
                  "linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.05),rgba(255,255,255,.5))",
                mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor" as never,
                animation: "borderGlow 3s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            {t("사전등록", "事前登録")}
          </a>
        </div>

        <div
          style={{
            font: "400 13px/1 var(--sans)",
            color: "var(--dt)",
            opacity: 0,
            animation: "fadeUp .8s ease 1.5s forwards",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span>{t("오늘", "本日")}</span>
          <strong style={{ color: "var(--dp)", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>
            {count}
          </strong>
          <span>{t("명 등록", "名登録")}</span>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          paddingBottom: 28,
          font: "500 10.5px/1 var(--eng)",
          color: "var(--dt)",
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: 0,
          animation: "fadeUp .8s ease 1.7s forwards",
          zIndex: 2,
          position: "relative",
        }}
      >
        <span style={{ display: "inline-block", paddingLeft: 4, opacity: 0.9 }}>
          {t("스크롤", "SCROLL")}
        </span>
        <span
          aria-hidden
          style={{
            display: "block",
            width: 1,
            height: 36,
            margin: "12px auto 0",
            background: "linear-gradient(to bottom, rgba(255,255,255,.55), transparent)",
            animation: "scrollLineGlow 1.8s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </div>
    </section>
  );
}
