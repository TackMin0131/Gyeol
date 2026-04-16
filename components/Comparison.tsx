"use client";
import { useEffect, useRef } from "react";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";
import dynamic from "next/dynamic";

const GyeolCard = dynamic(() => import("./GyeolCard"), { ssr: false });

const rivals = [
  {
    kr: { name: "데이팅앱", verdict: "가벼움", desc: "스와이프의 반복. 인증도 없고, 안전장치도 없다.<br>월 1~3만 원이면 시작할 수 있지만,<br>돌아오는 건 가벼운 만남뿐이었다." },
    jp: { name: "マッチングアプリ", verdict: "軽い", desc: "スワイプの繰り返し。認証もなく、安全もない。<br>月¥1~3千で始められるが、<br>戻ってくるのは軽い出会いだけだった。" },
  },
  {
    kr: { name: "소개팅", verdict: "기회 부족", desc: "좋은 사람이지만 기회가 1년에 몇 번뿐.<br>마음에 들어도 다음이 없고,<br>안전장치도 없다." },
    jp: { name: "友人の紹介", verdict: "機会不足", desc: "いい人だけど機会は年に数回だけ。<br>気に入っても次がなく、<br>安全もない。" },
  },
  {
    kr: { name: "결혼정보회사", verdict: "고비용", desc: "가입비만 500만~1,000만 원.<br>조건 위주 매칭. 진심이 아닌 사업 대상으로 느껴졌다.<br>그마저도 안전장치는 없다." },
    jp: { name: "結婚相談所", verdict: "高費用", desc: "入会金だけで数十万〜百万円。<br>条件中心のマッチング。真心ではなくビジネスの対象。<br>それでも安全はない。" },
  },
];

export default function Comparison() {
  const { lang, t } = useLang();
  const sectionRef = useReveal<HTMLElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rival cards observer
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) card.classList.add("show"); }),
        { threshold: 0.2 }
      );
      obs.observe(card);
      return () => obs.disconnect();
    });

    // Divider observer
    const div = dividerRef.current;
    if (div) {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            div.style.opacity = "1";
            setTimeout(() => { if (lineRef.current) lineRef.current.style.height = "40px"; }, 100);
            setTimeout(() => { if (textRef.current) textRef.current.style.opacity = "1"; }, 500);
          }
        }),
        { threshold: 0.2 }
      );
      obs.observe(div);
      return () => obs.disconnect();
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 36px", background: "var(--bk)", color: "var(--dp)", overflow: "hidden" }}>
      <div className="s-label reveal" style={{ color: "var(--dt)" }}>Comparison</div>
      <div className="s-title reveal" style={{ color: "var(--dp)" }}>
        {t("같은 돈, 다른 결과", "同じお金、違う結果")}
      </div>

      <div style={{ maxWidth: 400, margin: "40px auto 0" }}>
        {rivals.map((r, i) => {
          const d = lang === "kr" ? r.kr : r.jp;
          return (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                textAlign: "center",
                padding: "48px 0",
                opacity: 0,
                transform: "scale(.92)",
                transition: "all .7s cubic-bezier(.4,0,.2,1)",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,.04)" : "none",
              }}
              className="comp-card"
            >
              <div style={{ font: "800 26px/1.3 var(--sans)", color: "var(--dp)", marginBottom: 14 }}>{d.name}</div>
              <div style={{ font: "500 13px/1 var(--sans)", color: "rgba(255,100,100,.6)", letterSpacing: 2 }}>{d.verdict}</div>
              <div
                style={{ font: "400 13px/1.7 var(--sans)", color: "var(--dt)", marginTop: 18 }}
                dangerouslySetInnerHTML={{ __html: d.desc }}
              />
            </div>
          );
        })}

        {/* Divider */}
        <div ref={dividerRef} style={{ textAlign: "center", padding: "32px 0", opacity: 0, transition: "opacity .6s ease" }}>
          <div
            ref={lineRef}
            style={{
              width: 1,
              height: 0,
              background: "linear-gradient(to bottom,rgba(255,255,255,.04),rgba(255,255,255,.2),rgba(255,255,255,.04))",
              margin: "0 auto",
              transition: "height .8s ease",
            }}
          />
          <div
            ref={textRef}
            style={{
              font: "500 14px/1 var(--serif)",
              color: "var(--ds)",
              letterSpacing: 3,
              marginTop: 14,
              opacity: 0,
              transition: "opacity .5s ease .3s",
            }}
          >
            {t("그래서, 結", "だから、結")}
          </div>
        </div>

        {/* Lanyard 3D Card */}
        <GyeolCard />
      </div>
    </section>
  );
}
