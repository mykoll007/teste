import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
const { name, email, password, confirmPassword } = body;

// validação com Zod
const parsed = registerSchema.safeParse({
  name,
  email,
  password,
  confirmPassword,
});
if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors;
  const firstError = Object.values(errors).flat()[0] || "Preencha todos os campos corretamente";
  return NextResponse.json({ error: firstError }, { status: 400 });
}


if (password !== confirmPassword) {
  return NextResponse.json({ error: "As senhas não conferem" }, { status: 400 });
}


    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já registrado" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = signToken({ sub: user.id, email: user.email, name: user.name });

    const res = NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
    res.cookies.set({
      name: process.env.COOKIE_NAME || "auth",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Erro no registro:", err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
