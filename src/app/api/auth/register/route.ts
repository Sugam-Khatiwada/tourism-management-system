import { CreateUserDto,createUserSchema } from "@/validators/user.validator";
import { NextResponse } from "next/server";
import { UserRepository } from "@/repositories/user.repository";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const registerUserDto: CreateUserDto = await createUserSchema.parseAsync(body);

    const createdUser = await UserRepository.create(registerUserDto);

const token = jwt.sign(
      { userId: createdUser._id, role: createdUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
    const response = NextResponse.json(
      { message: "Registration successful", token },
      { status: 200 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    return response;

    } catch (err) {
        console.error(err);

        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }

        if (err instanceof Error && err.message.includes("already exists")) {
            return NextResponse.json({ error: err.message }, { status: 409 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
