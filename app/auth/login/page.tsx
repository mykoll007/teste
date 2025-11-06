"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const e = params.get("e");
    if (e === "cred") setError("E-mail ou senha incorretos");
    if (e === "invalid") setError("Dados inválidos");
    if (e === "server") setError("Erro interno, tente novamente");
  }, [params]);

  return (
    <div className="max-w-md mx-auto mt-20 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Entrar</h1>

      <form action="/api/auth/login" method="post" className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="password"
          name="password"
          placeholder="Senha"
          required
        />
        <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:opacity-90">
          Entrar
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>

      <p className="text-center text-neutral-400 text-sm mt-4">
        Não tem conta? <a href="/auth/register" className="underline hover:text-white">Registrar</a>
      </p>
    </div>
  );
}
