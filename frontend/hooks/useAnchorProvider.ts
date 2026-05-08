"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Transaction, VersionedTransaction } from "@solana/web3.js";

export const useAnchorProvider = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  if (!wallet.connected || !wallet.publicKey || !wallet.signTransaction) {
    return null;
  }

  // Anchor 0.32 trazi sendTransaction na wallet objektu
  // wallet-adapter ga ima ali s drugacijim signatureom — wrappamo ga
  const walletAdapter = {
    publicKey: wallet.publicKey,
    signTransaction: async <T extends Transaction | VersionedTransaction>(tx: T): Promise<T> => {
      return wallet.signTransaction!(tx);
    },
    signAllTransactions: async <T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> => {
      return wallet.signAllTransactions!(txs);
    },
    // Anchor 0.32 preferira sendTransaction direktno na provideru
    // ali ce fallback-ati na signTransaction ako ovo nije dostupno
  };

  return new AnchorProvider(
    connection,
    walletAdapter as any,
    { commitment: "confirmed", skipPreflight: true }
  );
};
