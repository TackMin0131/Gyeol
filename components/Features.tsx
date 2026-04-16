"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

const feats = [
  {
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    kr: { title: "5단계 신원 인증", desc: "본인확인, 안면인식, 직업·연봉,<br>학력, 미혼 증명까지.<br>검증된 사람만 만납니다." },
    jp: { title: "5段階の身元認証", desc: "本人確認、顔認証、職業・年収、<br>学歴、独身証明まで。<br>検証された方だけ。" },
  },
  {
    icon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
    kr: { title: "결혼 의향 서약", desc: "가입 시 결혼 전제 서약 필수.<br>캐주얼 목적은 가입 불가.<br>모든 사람이 진지합니다." },
    jp: { title: "結婚意向の誓約", desc: "登録時に結婚前提の誓約が必須。<br>カジュアルな目的では登録不可。<br>全員が真剣です。" },
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
    kr: { title: "실시간 한↔일 번역", desc: "채팅은 자동 번역.<br>원문과 번역문이 동시 표시되어,<br>언어가 달라도 진심이 전달됩니다." },
    jp: { title: "リアルタイム韓↔日翻訳", desc: "チャットは自動翻訳。<br>原文と翻訳文が同時表示。<br>言葉が違っても真心が伝わります。" },
  },
  {
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    kr: { title: "만남부터 귀가까지, 안전", desc: "오프라인 만남 등록,<br>만남 중 안전 체크, 귀가 확인.<br>당신의 안전을 끝까지 지킵니다." },
    jp: { title: "出会いから帰宅まで、安全", desc: "オフラインの面会登録、<br>安全チェック、帰宅確認。<br>あなたの安全を最後まで守ります。" },
  },
];

export default function Features() {
  const { lang } = useLang();
  const sectionRef = useReveal<HTMLElement>();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              setShown((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 150);
            obs.unobserve(e.target);
          }
        }),
        { threshold: 0.15 }
      );
      obs.observe(item);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 36px", background: "var(--wh)" }}>
      <div className="s-label reveal" style={{ color: "var(--lt)" }}>Why GYEOL</div>
      <div className="s-title reveal" style={{ color: "var(--lp)", marginBottom: 56 }}>
        {lang === "kr" ? "왜 GYEOL인가." : "なぜGYEOLなのか。"}
      </div>
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {feats.map((f, i) => {
          const d = lang === "kr" ? f.kr : f.jp;
          const isShown = shown[i];
          return (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{
                padding: "28px 0",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                position: "relative",
                opacity: isShown ? 1 : 0,
                transform: isShown ? "scale(1)" : "scale(.85)",
                transition: "opacity .7s ease, transform .7s cubic-bezier(.4,0,.2,1)",
                borderTop: i > 0 ? "1px solid transparent" : "none",
                backgroundImage: i > 0 ? "linear-gradient(90deg,transparent,var(--bl),transparent)" : "none",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            >
              <div
                style={{
                  minWidth: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--bl)",
                  borderRadius: 8,
                  marginTop: 2,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: 20, height: 20, stroke: "var(--ls)", strokeWidth: 1.5, fill: "none" }}
                  dangerouslySetInnerHTML={{ __html: f.icon }}
                />
              </div>
              <div>
                <h3 style={{ font: "700 14px/1.4 var(--sans)", color: "var(--lp)", marginBottom: 12 }}>{d.title}</h3>
                <p style={{ font: "400 13px/1.65 var(--sans)", color: "var(--ls)" }} dangerouslySetInnerHTML={{ __html: d.desc }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
