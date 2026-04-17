import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = "nodejs";

// Simple HMAC-signed session token (no external deps)
function signToken(): string {
  const secret = process.env.ADMIN_PASSWORD!;
  const payload = Date.now().toString();
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const token = signToken();
  const jar = await cookies();
  jar.set("gyeol_admin", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete("gyeol_admin");
  return NextResponse.json({ ok: true });
}
