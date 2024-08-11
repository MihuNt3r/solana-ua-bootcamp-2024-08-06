import 'dotenv/config';
import { Keypair } from '@solana/web3.js';

let privateKey = process.env["SECRET_KEY"];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public key: ${keypair.publicKey.toBase58()}`)