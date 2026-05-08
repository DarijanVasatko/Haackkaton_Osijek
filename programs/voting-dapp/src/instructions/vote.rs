use anchor_lang::prelude::*;
use crate::state::*;

pub fn handler(ctx: Context<Vote>, _poll_id: u64, option_index: u32) -> Result<()> {
    let poll = &mut ctx.accounts.poll;
    let vote = &mut ctx.accounts.vote_record;

    // Povećaj broj glasova za odabranu opciju [cite: 173]
    poll.options[option_index as usize].votes += 1;

    // Zapiši podatke o glasu [cite: 171, 172]
    vote.voter = ctx.accounts.voter.key();
    vote.poll_id = _poll_id;
    vote.option_index = option_index;
    vote.timestamp = Clock::get()?.unix_timestamp;

    Ok(())
}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct Vote<'info> {
    #[account(mut)]
    pub poll: Account<'info, PollAccount>,
    #[account(
        init, 
        payer = voter, 
        space = 8 + 32 + 8 + 4 + 8,
        // PDA sjeme: "vote" + adresa glasača + poll_id. 
        // Ovo jamči da jedan wallet može glasati samo jednom po anketi[cite: 173].
        seeds = [b"vote", voter.key().as_ref(), poll_id.to_be_bytes().as_ref()],
        bump
    )]
    pub vote_record: Account<'info, VoteAccount>,
    #[account(mut)]
    pub voter: Signer<'info>,
    pub system_program: Program<'info, System>,
}