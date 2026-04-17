import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, gender, lang } = await req.json();

    // Validate
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (gender !== "M" && gender !== "F") {
      return NextResponse.json({ ok: false, error: "invalid_gender" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Insert
    const { error: insertErr } = await supabase
      .from("registrations")
      .insert({ email: normalizedEmail, gender, lang: lang || "kr" });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return NextResponse.json({ ok: false, error: "duplicate" }, { status: 409 });
      }
      console.error("[register] insert failed:", insertErr);
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
    }

    // Get total count (service_role bypasses RLS)
    const { count } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({ ok: true, position: count ?? 1 });
  } catch (err) {
    console.error("[register] unexpected:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
