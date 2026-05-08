"use client";
import Link from "next/link";

interface PollCardProps {
  pollId: string;
  question: string;
  optionCount: number;
  author: string;
}

export default function PollCard({ pollId, question, optionCount, author }: PollCardProps) {
  return (
    <Link
      href={`/poll/${pollId}`}
      className="col-span-12 md:col-span-6 premium-card rounded-[2.5rem] p-8 group transition-all block"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
          🗳️
        </div>
        <span className="text-amber-500 font-mono text-sm tracking-tighter">
          ID: {pollId.slice(0, 6)}...
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-4 italic">{question}</h3>
      <div className="flex items-center justify-between text-xs font-black uppercase text-slate-500">
        <div className="flex items-center gap-2">
          <span>Opcije:</span>
          <span className="text-brand-primary">{optionCount}</span>
        </div>
        <span className="text-slate-600 truncate max-w-[120px]">
          {author.slice(0, 4)}...{author.slice(-4)}
        </span>
      </div>
    </Link>
  );
}