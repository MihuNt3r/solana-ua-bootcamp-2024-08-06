use dotenv::dotenv;
use std::env;
use solana_sdk::signer::keypair::Keypair;
use solana_sdk::signer::Signer;

fn main() {
    dotenv().ok();

    let secret_key_str = env::var("SECRET_KEY").unwrap();

    let trimmed = secret_key_str.trim_matches(|c| c == '[' || c == ']');

    let secret_key_arr: Vec<u8> = trimmed
        .split(',')
        .map(|s| s.trim().parse().expect("Failed to parse number"))
        .collect();

    let keypair = Keypair::from_bytes(&secret_key_arr).unwrap();

    let public_key = keypair.pubkey();

    println!("Public key: {:?}", public_key);
}
