import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LibrosNode — On-chain Glasanje",
  description: "Transparentno blockchain glasanje na Solani",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body>
        <WalletContextProvider>
          <Navbar />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
