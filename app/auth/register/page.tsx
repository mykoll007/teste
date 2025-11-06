"use client";
import { useState } from "react";

export default function RegisterPage() {
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erro ao registrar");
    } else {
      setMessage("Usuário criado com sucesso! Redirecionando...");
      setTimeout(() => (window.location.href = "/auth/login"), 1200);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Criar conta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="text"
          placeholder="Nome completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-white outline-none"
          type="password"
          placeholder="Confirmar senha"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:opacity-90"
        >
          Registrar
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-emerald-400 text-sm">{message}</p>}
      </form>

      <p className="text-center text-neutral-400 text-sm mt-4">
        Já tem conta?{" "}
        <a href="/auth/login" className="underline hover:text-white">
          Fazer login
        </a>
      </p>
    </div>
  );
}
