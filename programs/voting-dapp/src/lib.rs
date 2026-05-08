pub mod constants;
pub mod error;
pub mod state;

use anchor_lang::prelude::*;
use state::*;

declare_id!("Bpo3PiWxCnLuWAjJF1NMRFTPy15aF3HCPomVridm3yJw");

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct CreatePoll<'info> {
    #[account(init, payer = author, space = 8 + 32 + 8 + 256 + 512 + 8, seeds = [b"poll", poll_id.to_le_bytes().as_ref()], bump)]
    pub poll: Account<'info, Poll>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub poll: Account<'info, Poll>,
    #[account(init, payer = voter, space = 8 + 32 + 8 + 4 + 8, seeds = [b"vote", voter.key().as_ref(), poll_id.to_be_bytes().as_ref()], bump)]
    pub vote_record: Account<'info, VoteAccount>,
    #[account(mut)]
    pub voter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[program]
pub mod voting_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_poll(ctx: Context<CreatePoll>, poll_id: u64, question: String, options: Vec<String>) -> Result<()> {
        let poll = &mut ctx.accounts.poll;
        poll.author = ctx.accounts.author.key();
        poll.poll_id = poll_id;
        poll.question = question;
        poll.options = options.iter().map(|opt| crate::state::OptionStatus { name: opt.to_string(), votes: 0 }).collect();
        poll.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn vote(ctx: Context<CastVote>, poll_id: u64, option_index: u32) -> Result<()> {
        let poll = &mut ctx.accounts.poll;
        let vote = &mut ctx.accounts.vote_record;
        poll.options[option_index as usize].votes += 1;
        vote.voter = ctx.accounts.voter.key();
        vote.poll_id = poll_id;
        vote.option_index = option_index;
        vote.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }
}
