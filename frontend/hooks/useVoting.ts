"use client";
import { Program, Idl, BN } from "@coral-xyz/anchor";
import { useAnchorProvider } from "./useAnchorProvider";
import { PublicKey } from "@solana/web3.js";
import idlData from "@/idl/voting_dapp.json";

const PROGRAM_ID = new PublicKey("Bpo3PiWxCnLuWAjJF1NMRFTPy15aF3HCPomVridm3yJw");
const RPC_OPTS = { skipPreflight: true, commitment: "confirmed" as const };

function u64ToLeBytes(num: number): Uint8Array {
  const arr = new Uint8Array(8);
  let tmp = num;
  for (let i = 0; i < 8; i++) {
    arr[i] = tmp & 0xff;
    tmp = Math.floor(tmp / 256);
  }
  return arr;
}

export const useVoting = () => {
  const provider = useAnchorProvider();

  if (!provider) {
    return {
      createPoll: async () => { throw new Error("Wallet not connected"); },
      vote: async () => { throw new Error("Wallet not connected"); },
      fetchAllPolls: async () => [],
      fetchPoll: async () => { throw new Error("Wallet not connected"); },
    };
  }

  const program = new Program(idlData as Idl, provider) as any;

  const createPoll = async (question: string, options: string[]) => {
  try {
    const pollIdNum = Math.floor(Date.now() / 1000);
    const pollId = new BN(pollIdNum);
    
    // Explicitly use the BN version of the ID for the PDA seeds
    // Use .toArrayLike(Buffer, 'le', 8) for cleaner Anchor compatibility
    const leBytes = pollId.toArrayLike(Buffer, 'le', 8);

    const [pollPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("poll"), leBytes],
      PROGRAM_ID
    );

    console.log("Creating poll with:", {
      pollId: pollId.toString(),
      question,
      options,
      pollPda: pollPda.toString()
    });

    // Use the exact names from your IDL for accounts
    const tx = await program.methods
      .createPoll(pollId, question, options) 
      .accounts({
        poll: pollPda,
        author: provider.wallet.publicKey,
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .rpc(RPC_OPTS);

    return { tx, pollId: pollIdNum.toString() };
  } catch (error) {
    console.error("Full Error Object:", error);
    throw error;
  }
};

  const vote = async (pollIdStr: string, pollPda: PublicKey, optionIndex: number) => {
    const pollIdNum = parseInt(pollIdStr);
    const pollId = new BN(pollIdNum);
    const leBytes = u64ToLeBytes(pollIdNum);

    const [voteRecordPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("vote"), provider.wallet.publicKey.toBuffer(), leBytes],
      PROGRAM_ID
    );

    const tx = await program.methods
      .vote(pollId, optionIndex)
      .accounts({
        poll: pollPda,
        voteRecord: voteRecordPda,
        voter: provider.wallet.publicKey,
      })
      .rpc(RPC_OPTS);

    return tx;
  };

  const fetchAllPolls = async () => {
    return await program.account.poll.all();
  };

  const fetchPoll = async (pollIdStr: string) => {
    const pollIdNum = parseInt(pollIdStr);
    const leBytes = u64ToLeBytes(pollIdNum);
    const [pollPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("poll"), leBytes],
      PROGRAM_ID
    );
    const data = await program.account.poll.fetch(pollPda);
    return { ...data, pda: pollPda, pollId: new BN(pollIdNum) };
  };

  return { createPoll, vote, fetchAllPolls, fetchPoll };
};
