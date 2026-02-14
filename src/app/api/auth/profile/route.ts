import { NextResponse } from "next/server";
import { UserRepository } from "@/repositories/user.repository";
import { UpdateUserDto, updateUserSchema } from "@/validators/user.validator";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ZodError } from "zod";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await UserRepository.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;  
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const body = await request.json();
    const updateUserDto: UpdateUserDto = await updateUserSchema.parseAsync(body);
    const updatedUser = await UserRepository.update(decoded.userId, updateUserDto);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
    } catch (err) {
      console.error(err);
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }   
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

