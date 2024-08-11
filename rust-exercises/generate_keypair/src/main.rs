use solana_sdk::signature::{Keypair, Signer};

fn main() {
    let keypair = Keypair::new();

    println!("Public Key: {:?}", keypair.pubkey());
    println!("Private Key: {:?}", keypair.to_bytes());
}
