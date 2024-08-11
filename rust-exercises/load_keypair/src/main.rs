use dotenv::dotenv;
use std::env;

fn main() {
    dotenv().ok();

    let secret_key = env::var("SECRET_KEY").unwrap();

    println!("Secret key: {}", secret_key);
}
