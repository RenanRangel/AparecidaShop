// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ListProvider } from "@/components/list/ListProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ListProvider>{children}</ListProvider>
    </SessionProvider>
  );
}