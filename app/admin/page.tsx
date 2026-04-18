"use client";
import { useEffect, useState, useCallback } from "react";

type Row = {
  id: string;
  email: string;
  gender: "M" | "F";
  lang: string;
  created_at: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "M" | "F">("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (data.ok) {
        setRows(data.rows);
        setTotal(data.total);
        setAuthed(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("비밀번호가 틀렸습니다.");
        return;
      }
      await load();
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setRows([]);
  }

  async function handleDelete(row: Row) {
    const ok = confirm(`정말 삭제하시겠습니까?\n\n${row.email}\n\n이 작업은 되돌릴 수 없습니다.`);
    if (!ok) return;
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert("삭제 실패: " + (data.error || "unknown"));
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(err);
    }
  }

  function downloadCSV() {
    const header = ["email", "gender", "lang", "created_at"];
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [r.email, r.gender, r.lang, r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gyeol-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // LOGIN SCREEN
  if (authed === false) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#fff", padding: 24 }}>
        <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 360, padding: 32, border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, background: "rgba(255,255,255,.02)" }}>
          <h1 style={{ font: "700 20px/1 system-ui", letterSpacing: 4, marginBottom: 8 }}>GYEOL ADMIN</h1>
          <p style={{ font: "400 13px/1.6 system-ui", color: "rgba(255,255,255,.5)", marginBottom: 24 }}>사전등록 관리 페이지</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 4, color: "#fff", font: "400 14px/1 system-ui", marginBottom: 12 }}
          />
          {loginError && <p style={{ color: "#ff6b6b", font: "400 12px/1.5 system-ui", marginBottom: 12 }}>{loginError}</p>}
          <button type="submit" disabled={loggingIn || !password} style={{ width: "100%", padding: 14, background: "#fff", color: "#000", border: "none", borderRadius: 4, font: "700 13px/1 system-ui", letterSpacing: 2, cursor: "pointer", opacity: loggingIn || !password ? 0.5 : 1 }}>
            {loggingIn ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  if (authed === null) {
    return <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center", font: "400 13px/1 system-ui" }}>loading...</div>;
  }

  // Filtered rows
  const filtered = rows.filter((r) => {
    if (filter !== "all" && r.gender !== filter) return false;
    if (search && !r.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const mCount = rows.filter((r) => r.gender === "M").length;
  const fCount = rows.filter((r) => r.gender === "F").length;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ font: "700 22px/1 system-ui", letterSpacing: 4, marginBottom: 6 }}>GYEOL ADMIN</h1>
            <p style={{ font: "400 13px/1 system-ui", color: "rgba(255,255,255,.4)" }}>사전등록 관리</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => load()} style={btnSecondary}>
              {loading ? "..." : "새로고침"}
            </button>
            <button onClick={downloadCSV} disabled={rows.length === 0} style={btnSecondary}>
              CSV 다운로드
            </button>
            <button onClick={handleLogout} style={{ ...btnSecondary, color: "rgba(255,255,255,.5)" }}>
              로그아웃
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
          <StatCard label="총 등록" value={total} />
          <StatCard label="한국 남성 (M)" value={mCount} accent="#6fa8ff" />
          <StatCard label="일본 여성 (F)" value={fCount} accent="#ff9ec7" />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {(["all", "M", "F"] as const).map((g) => (
              <button key={g} onClick={() => setFilter(g)} style={{ ...pillBtn, background: filter === g ? "#fff" : "transparent", color: filter === g ? "#000" : "#fff" }}>
                {g === "all" ? "전체" : g === "M" ? "남성" : "여성"}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이메일 검색..."
            style={{ flex: 1, minWidth: 200, padding: "8px 12px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, color: "#fff", font: "400 13px/1 system-ui" }}
          />
        </div>

        {/* Table */}
        <div style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", font: "400 13px/1.5 system-ui" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.04)" }}>
                <th style={th}>#</th>
                <th style={th}>이메일</th>
                <th style={th}>성별</th>
                <th style={th}>언어</th>
                <th style={th}>등록일시</th>
                <th style={{ ...th, textAlign: "right", width: 80 }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: "rgba(255,255,255,.3)", padding: 40 }}>{rows.length === 0 ? "아직 등록이 없습니다." : "조건에 맞는 결과가 없습니다."}</td></tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                    <td style={{ ...td, color: "rgba(255,255,255,.4)", width: 50 }}>{i + 1}</td>
                    <td style={td}>{r.email}</td>
                    <td style={td}>
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 3, background: r.gender === "M" ? "rgba(111,168,255,.15)" : "rgba(255,158,199,.15)", color: r.gender === "M" ? "#6fa8ff" : "#ff9ec7", font: "600 11px/1.5 system-ui" }}>
                        {r.gender === "M" ? "남 KR" : "여 JP"}
                      </span>
                    </td>
                    <td style={{ ...td, color: "rgba(255,255,255,.5)" }}>{r.lang.toUpperCase()}</td>
                    <td style={{ ...td, color: "rgba(255,255,255,.5)", fontVariantNumeric: "tabular-nums" }}>{new Date(r.created_at).toLocaleString("ko-KR")}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(r)}
                        style={{
                          padding: "6px 10px",
                          background: "transparent",
                          color: "#ff6b6b",
                          border: "1px solid rgba(255,107,107,.25)",
                          borderRadius: 4,
                          font: "500 11px/1 system-ui",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,107,107,.08)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 16, font: "400 12px/1 system-ui", color: "rgba(255,255,255,.3)", textAlign: "center" }}>
          {filtered.length}명 표시 / 총 {rows.length}명
        </p>
      </div>
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  padding: "8px 14px",
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: 4,
  font: "500 12px/1 system-ui",
  cursor: "pointer",
};

const pillBtn: React.CSSProperties = {
  padding: "6px 14px",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: 999,
  font: "600 12px/1 system-ui",
  cursor: "pointer",
  transition: ".2s",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px",
  font: "600 11px/1 system-ui",
  letterSpacing: 1,
  color: "rgba(255,255,255,.5)",
  textTransform: "uppercase",
};

const td: React.CSSProperties = {
  padding: "14px 16px",
};

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div style={{ padding: "20px 24px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 6 }}>
      <div style={{ font: "500 11px/1 system-ui", letterSpacing: 1, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>{label}</div>
      <div style={{ font: "700 28px/1 system-ui", color: accent ?? "#fff", fontVariantNumeric: "tabular-nums" }}>{value.toLocaleString()}</div>
    </div>
  );
}
