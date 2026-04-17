import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isAdminAuthed } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error, count } = await supabase
    .from("registrations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, total: count ?? 0, rows: data ?? [] });
}
