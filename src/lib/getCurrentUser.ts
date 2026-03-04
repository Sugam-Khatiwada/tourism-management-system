import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import { UserRepository } from "@/repositories/user.repository";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = verifyJwt(token);
    const user = await UserRepository.findById(payload.userId);
    return user;
  } catch {
    return null;
  }
}