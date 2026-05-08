"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="premium-card rounded-2xl px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-brand-bg rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <span className="text-xl font-black tracking-widest uppercase italic">
            Libros<span className="text-brand-primary underline decoration-amber-500">Node</span>
          </span>
        </Link>
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary">Lobby</Link>
          <Link href="/create" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary">Propose</Link>
          <div className="scale-75 origin-right">
            {mounted && <WalletMultiButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
