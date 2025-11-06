import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = process.env.COOKIE_NAME || "auth";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export type JWTPayload = {
  sub: string;
  email: string;
  name: string;
};

// Cria o token JWT
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
}

// Verifica e decodifica o token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Lê o cookie diretamente do contexto do servidor
export function getAuthCookie(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Apaga o cookie (usado no logout)
export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
