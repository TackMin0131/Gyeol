"use client";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

const pains = [
  {
    num: "01",
    kr: { name: "데이팅앱", desc: "스와이프, 매칭, 안 읽힘, 유령.<br><strong>가벼운 만남의 끝없는 반복.</strong><br>인연을 기대했지만,<br>돌아오는 건 늘 실망뿐이었다." },
    jp: { name: "マッチングアプリ", desc: "スワイプ、マッチ、既読スルー。<br><strong>軽い出会いの終わりなき繰り返し。</strong><br>運命を期待しても、<br>戻ってくるのはいつも失望だけだった。" },
  },
  {
    num: "02",
    kr: { name: "지인 소개팅", desc: "좋은 사람이지만,<br>기회가 <strong>1년에 몇 번뿐.</strong><br>마음에 들어도 다음이 없다." },
    jp: { name: "友人の紹介", desc: "いい人だけど、<br>機会は<strong>年に数回だけ。</strong><br>気に入っても次がない。" },
  },
  {
    num: "03",
    kr: { name: "결혼정보회사", desc: "가입비 <strong>500만 원 ~ 1,000만 원.</strong><br>조건표의 한 줄로 평가당하는 기분.<br>진심은 어디에도 없었다." },
    jp: { name: "結婚相談所", desc: "入会金<strong>数十万円〜百万円。</strong><br>条件表の一行で評価される感覚。<br>真心はどこにもなかった。" },
  },
];

export default function PainPoints() {
  const { lang, t } = useLang();
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} style={{ padding: "100px 36px", background: "var(--wh)" }}>
      <div className="s-label reveal" style={{ color: "var(--lt)" }}>Pain Points</div>
      <div
        className="s-title reveal"
        style={{ color: "var(--lp)" }}
        dangerouslySetInnerHTML={{ __html: t("당신이 겪어온 것들.", "あなたが経験してきたこと。") }}
      />
      <div style={{ maxWidth: 440, margin: "48px auto 0" }}>
        {pains.map((p, i) => {
          const data = lang === "kr" ? p.kr : p.jp;
          return (
            <div
              key={p.num}
              className={`reveal ${i > 0 ? `d${i}` : ""}`}
              style={{
                padding: "28px 0",
                position: "relative",
                borderTop: "1px solid transparent",
                backgroundImage: "linear-gradient(90deg,transparent,var(--bl),transparent)",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
              }}
            >
              <div style={{ font: "300 13px/1 var(--sans)", color: "var(--lt)", letterSpacing: 3, marginBottom: 16 }}>{p.num}</div>
              <div style={{ font: "700 17px/1.35 var(--sans)", color: "var(--lp)", marginBottom: 16 }}>{data.name}</div>
              <div
                style={{ font: "400 13px/1.7 var(--sans)", color: "var(--ls)" }}
                dangerouslySetInnerHTML={{ __html: data.desc }}
              />
            </div>
          );
        })}
      </div>
      <div className="reveal" style={{ textAlign: "center", marginTop: 72 }}>
        <p style={{ font: "600 22px/1.4 var(--serif)", color: "var(--lp)" }}>
          {t("그래서 만들었습니다.", "だから、作りました。")}
        </p>
        <small style={{ font: "400 13px/1.5 var(--sans)", color: "var(--lt)", display: "block", marginTop: 16 }}>
          {t("당신이 주인공인 결혼 매칭.", "あなたが主役の結婚マッチング。")}
        </small>
      </div>
    </section>
  );
}
