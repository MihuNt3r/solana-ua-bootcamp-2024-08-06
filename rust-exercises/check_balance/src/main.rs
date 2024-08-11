use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;

fn main() {
    let rpc_url = "https://api.devnet.solana.com";
    let client = RpcClient::new(rpc_url.to_string());

    let wallet_address = "CUg6m4NywWfjQw4v8tiLmLuggnuKpiDb2fiRQ7VaLbsh";
    let pubkey = wallet_address.parse::<Pubkey>().unwrap();

    let balance = client.get_balance(&pubkey).unwrap();
    println!("Balance in Lamports: {}", balance);
    println!("Wallet balance in SOL: {}", balance as f64 / 1_000_000_000.0)
}