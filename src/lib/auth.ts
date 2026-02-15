import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthPayload = {
  userId: string;
  role: string;
};

export async function requireRole(allowedRoles: string[]): Promise<AuthPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT secret");
  }

  const decoded = jwt.verify(token, secret) as AuthPayload;
  if (!allowedRoles.includes(decoded.role)) {
    throw new Error("Forbidden");
  }

  return decoded;
}
