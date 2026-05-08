pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("Bpo3PiWxCnLuWAjJF1NMRFTPy15aF3HCPomVridm3yJw");

#[program]
pub mod voting_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }

    // Dodaj ove funkcije za 11. zadatak:
    pub fn create_poll(
        ctx: Context<CreatePoll>, 
        poll_id: u64, 
        question: String, 
        options: Vec<String>
    ) -> Result<()> {
        instructions::create_poll::handler(ctx, poll_id, question, options)
    }

    pub fn vote(ctx: Context<Vote>, poll_id: u64, option_index: u32) -> Result<()> {
        instructions::vote::handler(ctx, poll_id, option_index)
    }
}
