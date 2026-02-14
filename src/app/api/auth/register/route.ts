import { CreateUserDto,createUserSchema } from "@/validators/user.validator";
import { NextResponse } from "next/server";
import { UserRepository } from "@/repositories/user.repository";
import { cookies } from "next/headers";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const registerUserDto: CreateUserDto = await createUserSchema.parseAsync(body);

    const createdUser = await UserRepository.create(registerUserDto);
    
    return NextResponse.json(createdUser, { status: 201 });

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
