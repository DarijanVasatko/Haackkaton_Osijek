Voting DApp - Solana & Next.js
Decentralizirana aplikacija za glasanje izgrađena pomoću Anchor okvira na Solani s modernim Next.js frontendom. Ova aplikacija omogućuje korisnicima sigurno kreiranje anketa i glasanje izravno na blockchainu.

🚀 Značajke
Decentralizirano kreiranje anketa: Korisnici mogu pokrenuti vlastite ankete s više opcija.

On-Chain glasanje: Svaki glas se bilježi na Solana blockchainu radi potpune transparentnosti.

PDA pohrana: Koristi Program Derived Addresses (PDA) za efikasno upravljanje podacima.

Premium UI: Moderan i responzivan dizajn izgrađen pomoću Tailwind CSS-a i Next.js-a.

🛠 Tehnologije
Blockchain: Solana, Anchor Framework (Rust)

Frontend: Next.js (Turbopack), TypeScript

Stiliziranje: Tailwind CSS

Wallet integracija: @solana/wallet-adapter

🔧 Struktura Programa
Solana program (voting_dapp) sastoji se od:

create_poll: Inicijalizira novi račun za anketu koristeći poll_id kao seed.

vote: Povećava broj glasova za određenu opciju i kreira jedinstveni vote_record PDA kako bi se spriječilo dvostruko glasanje.

📦 Instalacija i Postavljanje
Backend (Anchor)
Uđi u direktorij programa.

Pokreni anchor build.

Deployaj program pomoću anchor deploy.

Provjeri da li se Program ID u lib.rs i Anchor.toml podudara s tvojom deployment adresom.

Frontend (Next.js)
Instaliraj pakete:
npm install

Provjeri je li IDL (target/idl/voting_dapp.json) kopiran u frontend @/idl/ mapu.

Pokreni razvojni server:
npm run dev
