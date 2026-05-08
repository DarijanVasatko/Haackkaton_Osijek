use anchor_lang::prelude::*;

#[account]
pub struct PollAccount {
    pub author: Pubkey,
    pub poll_id: u64,
    pub question: String,
    pub options: Vec<OptionStatus>,
    pub timestamp: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OptionStatus {
    pub name: String,
    pub votes: u64,
}

#[account]
pub struct VoteAccount {
    pub voter: Pubkey,
    pub poll_id: u64,
    pub option_index: u32,
    pub timestamp: i64,
}  