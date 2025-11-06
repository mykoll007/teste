import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // recebe do <form> (sem fetch)
    const form = await req.formData();
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      return NextResponse.redirect(new URL("/auth/login?e=invalid", req.url));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login?e=cred", req.url));
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.redirect(new URL("/auth/login?e=cred", req.url));
    }

    const token = signToken({ sub: user.id, email: user.email, name: user.name });

// seta o cookie e redireciona para /dashboard na MESMA resposta
const dashboardURL = new URL("/dashboard", req.url);
const res = NextResponse.redirect(dashboardURL, { status: 303 });
res.cookies.set({
  name: process.env.COOKIE_NAME || "auth",
  value: token,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});
return res;

  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.redirect(new URL("/auth/login?e=server", req.url));
  }
}
