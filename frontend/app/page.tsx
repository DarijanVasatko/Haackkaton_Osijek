"use client";
import { useEffect, useState } from "react";
import { useVoting } from "@/hooks/useVoting";
import PollCard from "@/components/PollCard";
import Link from "next/link";

export default function Home() {
  const { fetchAllPolls } = useVoting();
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    fetchAllPolls().then(setPolls).catch(console.error);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-40 pb-20">
      <div className="flex gap-4 mb-16 overflow-x-auto pb-4">
        {["System Health: Optimal", `Active Polls: ${polls.length}`, "Network: Devnet"].map((stat, i) => (
          <div key={i} className="premium-card px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary whitespace-nowrap">
            ● {stat}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 premium-card rounded-[3rem] p-16 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px]" />
          <h1 className="text-6xl font-black italic tracking-tighter leading-none mb-8">
            VLADAJTE <br /><span className="text-brand-primary">SVOJIM TOKENOM.</span>
          </h1>
          <p className="text-slate-400 max-w-sm mb-10 font-medium">
            Prva platforma u regiji za potpuno transparentno on-chain glasanje bez posrednika.
          </p>
          <Link href="/create" className="btn-action">Istraži Prijedloge</Link>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-amber-500 rounded-[3rem] p-10 text-brand-bg flex flex-col justify-between">
          <h2 className="text-3xl font-black leading-tight uppercase italic">Nemaš <br />ideju?</h2>
          <p className="font-bold text-sm mb-6 opacity-80">
            Pregledaj dokumentaciju i nauči kako pokrenuti revoluciju unutar zajednice.
          </p>
          <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2z" /></svg>
          </div>
        </div>

        {polls.length === 0 ? (
          <div className="col-span-12 text-center text-slate-500 py-12 uppercase tracking-widest text-sm">
            Nema aktivnih glasanja. Budi prvi!
          </div>
        ) : (
          polls.map((p) => (
            <PollCard
              key={p.publicKey.toString()}
              pollId={p.account.pollId.toString()}
              question={p.account.question}
              optionCount={p.account.options.length}
              author={p.account.author.toString()}
            />
          ))
        )}
      </div>
    </main>
  );
}