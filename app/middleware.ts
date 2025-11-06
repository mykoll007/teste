import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.COOKIE_NAME || "auth")?.value;
  const verified = token ? verifyToken(token) : null;

  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");

  console.log("🧠 Middleware token:", verified ? "SIM" : "NÃO", "| path:", pathname);

  // ✅ Se estiver logado e tentar acessar /auth/login ou /auth/register → manda pro dashboard
  if (verified && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 🚫 Se NÃO estiver logado e tentar acessar qualquer rota protegida (/dashboard)
  if (!verified && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Caso contrário, segue normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
