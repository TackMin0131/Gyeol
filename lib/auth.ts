import { cookies } from "next/headers";
import crypto from "crypto";

export async function isAdminAuthed(): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const jar = await cookies();
  const token = jar.get("gyeol_admin")?.value;
  if (!token) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (sig !== expected) return false;

  // 8h expiry
  const ts = Number(payload);
  if (!Number.isFinite(ts)) return false;
  if (Date.now() - ts > 8 * 60 * 60 * 1000) return false;

  return true;
}
