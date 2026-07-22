"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./actions";

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await registerUser(form.name, form.email, form.password);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push("/login?cadastrado=1");
  }

  return (
    <section className="mx-auto max-w-md py-20 px-6">
      <h1 className="font-display text-[28px] font-semibold text-ink">Criar conta</h1>
      <p className="mt-2 text-[14px] text-ink-soft">
        Crie sua conta para cadastrar e gerenciar sua loja.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">Nome</label>
          <input
            required
            className="form-input"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">E-mail</label>
          <input
            required
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">Senha</label>
          <input
            required
            type="password"
            minLength={8}
            className="form-input"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-pine py-3 text-[14.5px] font-semibold text-bg disabled:opacity-70"
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>
    </section>
  );
}