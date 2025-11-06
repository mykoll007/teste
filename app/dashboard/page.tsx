export const dynamic = "force-dynamic";

import { getAuthCookie, verifyToken, clearAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const token = getAuthCookie();
  const user = token ? verifyToken(token) : null;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>
        Bem-vindo, <b>{user?.name}</b> 👑
      </p>

      <form action="/api/auth/logout" method="post">
        <button
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
          type="submit"
        >
          Sair
        </button>
      </form>
    </div>
  );
}
