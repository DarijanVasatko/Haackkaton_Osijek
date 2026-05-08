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

⚠️ Rješavanje problema (Troubleshooting)
Greška: Unknown action 'undefined'
Ako se pojavi ova greška na frontendu:

Nazivi metoda: Provjeri konzolu za program.methods. Anchor obično pretvara snake_case Rust funkcije u camelCase u TypeScriptu (npr. create_poll postaje createPoll).

Tipovi argumenata: Provjeri je li poll_id proslijeđen kao Anchor BN (Big Number), a ne kao običan broj ili string.

Account ključevi: Osiguraj da je systemProgram eksplicitno naveden u .accounts() pozivu ako IDL to zahtijeva.

PDA Seed Neujednačenost
Pripazi da redoslijed bajtova (byte ordering) u TypeScriptu odgovara Rust kodu:

Ako Rust koristi to_le_bytes(), koristi pollId.toArrayLike(Buffer, 'le', 8).

Ako Rust koristi to_be_bytes(), koristi pollId.toBuffer('be', 8).
