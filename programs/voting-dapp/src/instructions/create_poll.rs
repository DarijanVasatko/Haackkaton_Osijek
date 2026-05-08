use anchor_lang::prelude::*;
use crate::state::*;

pub fn handler(
    ctx: Context<CreatePoll>, 
    poll_id: u64, 
    question: String, 
    options: Vec<String>
) -> Result<()> {
    let poll = &mut ctx.accounts.poll;
    poll.author = ctx.accounts.author.key();
    poll.poll_id = poll_id;
    poll.question = question;
    poll.options = options.iter().map(|opt| OptionStatus {
        name: opt.to_string(),
        votes: 0,
    }).collect();
    poll.timestamp = Clock::get()?.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct CreatePoll<'info> {
    #[account(
        init, 
        payer = author, 
        space = 8 + 32 + 8 + 100 + 200 + 8, 
        seeds = [b"poll", poll_id.to_be_bytes().as_ref()], 
        bump
    )]
    pub poll: Account<'info, PollAccount>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}