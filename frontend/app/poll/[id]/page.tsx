"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useVoting } from "@/hooks/useVoting";
import { useWallet } from "@solana/wallet-adapter-react";

export default function PollPage() {
  const { id } = useParams();
  const { fetchPoll, vote } = useVoting();
  const { connected } = useWallet();
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchPoll(id as string)
      .then(setPoll)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async (optionIndex: number) => {
    if (!connected) return alert("Spoji wallet!");
    setVoting(true);
    try {
      const tx = await vote(id as string, poll.pda, optionIndex);
      alert(`Glas potvrđen! Tx: ${tx}`);
      const updated = await fetchPoll(id as string);
      setPoll(updated);
    } catch (e: any) {
      console.error(e);
      alert(`Greška: ${e.message}`);
    } finally {
      setVoting(false);
    }
  };

  const totalVotes = poll?.options.reduce(
    (sum: number, o: any) => sum + Number(o.votes), 0
  ) || 0;

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/" className="text-slate-500 hover:text-white transition-colors">
          &larr; Povratak
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-500 truncate max-w-[200px]">Poll ID: {id}</span>
      </div>

      {loading && (
        <div className="premium-card rounded-[3rem] p-12 text-center text-slate-400 uppercase tracking-widest text-sm">
          Učitavanje...
        </div>
      )}

      {!loading && !poll && (
        <div className="premium-card rounded-[3rem] p-12 text-center text-slate-400 uppercase tracking-widest text-sm">
          Glasanje nije pronađeno.
        </div>
      )}

      {poll && (
        <div className="premium-card rounded-[3rem] p-12">
          <h1 className="text-4xl font-black mb-4 italic leading-tight">{poll.question}</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-12">
            Ukupno glasova: {totalVotes}
          </p>
          <div className="space-y-6">
            {poll.options.map((opt: any, i: number) => {
              const votes = Number(opt.votes);
              const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              return (
                <div
                  key={i}
                  onClick={() => !voting && handleVote(i)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-2xl transition-all group-hover:bg-white/10" />
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-primary/20 rounded-2xl border-l-4 border-brand-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative p-6 flex justify-between items-center">
                    <span className="font-bold text-lg">{opt.name}</span>
                    <div className="text-right">
                      <span className="block font-black text-brand-primary">{percentage}%</span>
                      <span className="text-xs text-slate-500 uppercase">{votes} glasova</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-slate-500 text-sm mt-8 text-center uppercase tracking-widest">
            {voting ? "Slanje glasa..." : "Klikni na opciju za glasanje"}
          </p>
        </div>
      )}
    </main>
  );
}