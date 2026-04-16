"use client";
import { useLang } from "@/hooks/useLang";
import { useReveal } from "@/hooks/useReveal";

const bodyKr = `한국에서 일본 여성을 만날 방법은<br>거의 없었습니다.<span class='break' style='display:block;height:20px'></span>있다 해도 브로커를 통해야 했고,<br>상대가 어떤 사람인지 알 수 없었고,<br>수백만 원을 내고도 불안했습니다.<span class='break' style='display:block;height:20px'></span>일본에서 한국 남성을 만나고 싶은<br>여성들도 마찬가지였습니다.<br>한류를 좋아하는 것과<br>신뢰할 수 있는 사람을 만나는 것은<br>완전히 다른 문제니까요.<span class='break' style='display:block;height:20px'></span>그래서 <em style='font-style:normal;color:var(--dp);font-weight:500'>結</em>을 만들었습니다.<span class='break' style='display:block;height:20px'></span>한국 남성과 일본 여성,<br>서로의 진심이 검증된 사람끼리만.<br>언어가 달라도 대화가 되도록.<br>국경을 넘는 만남이 안전하도록.<span class='break' style='display:block;height:20px'></span>두 나라의 좋은 사람들이<br><em style='font-style:normal;color:var(--dp);font-weight:500'>결국 만나야 할 사람을 만나는 곳.</em><br>그게 結입니다.`;

const bodyJp = `韓国で日本人女性と出会う方法は<br>ほとんどありませんでした。<span class='break' style='display:block;height:20px'></span>あったとしてもブローカーを通すしかなく、<br>相手がどんな人かわからず、<br>数百万ウォンを払っても不安でした。<span class='break' style='display:block;height:20px'></span>日本で韓国人男性と出会いたい<br>女性たちも同じでした。<br>韓流が好きなことと<br>信頼できる人に出会うことは<br>まったく別の問題ですから。<span class='break' style='display:block;height:20px'></span>だから<em style='font-style:normal;color:var(--dp);font-weight:500'>結</em>を作りました。<span class='break' style='display:block;height:20px'></span>韓国人男性と日本人女性、<br>お互いの真心が検証された人だけ。<br>言葉が違っても会話ができるように。<br>国境を超える出会いが安全であるように。<span class='break' style='display:block;height:20px'></span>二つの国の素敵な人たちが<br><em style='font-style:normal;color:var(--dp);font-weight:500'>結局、出会うべき人に出会う場所。</em><br>それが結です。`;

export default function Founder() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} style={{ padding: "100px 36px", background: "var(--bk)", color: "var(--dp)", position: "relative" }}>
      <div style={{ maxWidth: 360, margin: "0 auto" }}>
        <div className="reveal" style={{ font: "600 13px/1 var(--eng)", letterSpacing: 4, textTransform: "uppercase", color: "var(--dt)", marginBottom: 40 }}>
          From the Founder
        </div>
        <div
          className="reveal"
          style={{ font: "300 15px/2 var(--sans)", color: "var(--ds)" }}
          dangerouslySetInnerHTML={{ __html: t(bodyKr, bodyJp) }}
        />
        <div className="reveal" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ font: "700 15px/1 var(--sans)", color: "var(--dp)" }}>김택민</div>
          <div style={{ font: "400 13px/1 var(--sans)", color: "var(--dt)", marginTop: 6 }}>
            {t("結 대표", "結 代表")}
          </div>
        </div>
      </div>
    </section>
  );
}
