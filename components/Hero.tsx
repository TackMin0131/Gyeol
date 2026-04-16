"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";

export default function Hero() {
  const { t } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(0);
  const target = useRef(20 + Math.floor(Math.random() * 18));

  // Counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      let cur = 0;
      const frame = () => {
        if (cur < target.current) {
          cur++;
          setCount(cur);
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // LineWaves canvas
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    let mouseY = 0.5;
    let waveTime = 0;
    let animId: number;

    const onMouse = (e: MouseEvent) => {
      mouseY = e.clientY / window.innerHeight;
    };
    document.addEventListener("mousemove", onMouse);

    const waveLines = Array.from({ length: 20 }, (_, i) => ({
      y: 0.05 + (i / 20) * 0.92,
      amp: 15 + Math.random() * 25,
      freq: 0.003 + Math.random() * 0.004,
      speed: 0.004 + Math.random() * 0.008,
      alpha: 0.03 + Math.random() * 0.05,
      width: 0.8 + Math.random() * 1.2,
      slope: 0.15 + Math.random() * 0.2,
    }));

    function resize() {
      const r = window.devicePixelRatio || 1;
      const parent = cvs!.parentElement!;
      cvs!.width = parent.offsetWidth * r;
      cvs!.height = parent.offsetHeight * r;
      ctx!.scale(r, r);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = cvs!.parentElement!.offsetWidth;
      const h = cvs!.parentElement!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      const grd = ctx!.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.5);
      grd.addColorStop(0, "rgba(255,255,255,0.03)");
      grd.addColorStop(1, "transparent");
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, w, h);

      waveLines.forEach((line) => {
        ctx!.beginPath();
        const baseY = h * line.y;
        const mouseInfluence = (mouseY - 0.5) * 10;
        for (let x = -50; x <= w + 50; x += 1.5) {
          const nx = x / w;
          const diag = x * line.slope;
          const y =
            baseY +
            diag +
            Math.sin(x * line.freq + waveTime * line.speed * 80) * line.amp +
            Math.sin(x * line.freq * 2.1 + waveTime * line.speed * 35) * line.amp * 0.25 +
            mouseInfluence * Math.sin(nx * Math.PI);
          if (x === -50) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(255,255,255,${line.alpha})`;
        ctx!.lineWidth = line.width;
        ctx!.stroke();
        if (line.width >= 1.5) {
          ctx!.strokeStyle = `rgba(255,255,255,${line.alpha * 0.25})`;
          ctx!.lineWidth = line.width + 3;
          ctx!.stroke();
        }
      });

      waveTime += 0.016;
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const headline = t("결국 만나야 할 사람", "結局、出会うべき人");

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "140px 24px 100px",
        background: "var(--bk)",
        color: "var(--dp)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "0 8px", maxWidth: "100%", width: "100%" }}>
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
                borderRadius: 2,
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
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: "center",
          font: "300 13px/1 var(--eng)",
          color: "var(--dt)",
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: 0,
          animation: "fadeUp .8s ease 1.7s forwards",
        }}
      >
        <span style={{ display: "inline-block", paddingLeft: 4 }}>scroll</span>
        <span
          style={{
            display: "block",
            width: 1,
            height: 24,
            margin: "10px auto 0",
            background: "linear-gradient(to bottom,var(--dt),transparent)",
            animation: "scrollLine 2s ease infinite",
          }}
        />
      </div>
    </section>
  );
}
