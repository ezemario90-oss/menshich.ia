"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Autenticación contra backend
    const response = await fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem("admin_token", data.token);
      window.location.href = "/dashboard";
    } else {
      setError(data.error || "Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-20">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Correo</label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="correo@cliente.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="demo"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="w-full px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white">Entrar</button>
      </form>
    </section>
  );
}