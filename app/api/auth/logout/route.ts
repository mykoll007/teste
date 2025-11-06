import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Cria a URL absoluta pro redirect
    const loginUrl = new URL("/auth/login", req.url);

    // Cria a resposta de redirecionamento
    const res = NextResponse.redirect(loginUrl, { status: 303 });

    // Remove o cookie de autenticação
    res.cookies.delete(process.env.COOKIE_NAME || "auth");

    return res;
  } catch (err) {
    console.error("Erro no logout:", err);
    return NextResponse.json({ error: "Erro ao sair" }, { status: 500 });
  }
}
