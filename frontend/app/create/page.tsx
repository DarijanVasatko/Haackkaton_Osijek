"use client";
import { useState } from "react";
import { useVoting } from "@/hooks/useVoting";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const { createPoll } = useVoting();
  const { connected } = useWallet();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const addOption = () => setOptions([...options, ""]);

  const handleCreate = async () => {
    if (!connected) return alert("Spoji wallet!");
    const filtered = options.filter(o => o.trim() !== "");
    if (!title.trim() || filtered.length < 2) return alert("Upiši pitanje i barem 2 opcije!");
    setLoading(true);
    try {
      const { tx, pollId } = await createPoll(title, filtered);
      alert("Glasanje kreirano! Tx: " + tx);
      router.push("/poll/" + pollId);
    } catch (e: any) {
      console.error(e);
      alert("Greška: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <div className="premium-card rounded-[2.5rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl" />
        <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">
          Pokreni <span className="text-brand-primary">Glasanje</span>
        </h2>
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
              Pitanje / Naslov
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 outline-none focus:border-brand-primary/50 transition-all text-xl font-medium"
              placeholder="Npr. Tko treba biti novi predsjednik udruge?"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">
              Opcije za odgovore
            </label>
            {options.map((opt, i) => (
              <input
                key={i}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...options];
                  newOpts[i] = e.target.value;
                  setOptions(newOpts);
                }}
                className="w-full bg-slate-950/30 border border-white/5 rounded-xl p-4 outline-none focus:border-brand-primary/30 transition-all"
                placeholder={"Opcija " + (i + 1)}
              />
            ))}
            <button
              onClick={addOption}
              className="text-sm font-bold text-brand-primary hover:text-emerald-400 transition-colors uppercase tracking-widest"
            >
              + Dodaj jos jednu opciju
            </button>
          </div>
          <div className="pt-4">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="btn-action w-full py-5 text-lg uppercase tracking-widest"
            >
              {loading ? "Slanje..." : "Lansiraj na Blockchain"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
