import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { 
    Keypair,
    clusterApiUrl,
    Connection,
    PublicKey
} from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

let privateKey = process.env['SECRET_KEY'];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

console.log(`Our public key is ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey('GmjBpaTDUWr9AAkoZMHURjdRRiR4jAA5dNSZKBWAuxR2');
const recipient = new PublicKey('6uaeXdJs6sw4ZmjtSv6NRsZWSipDypC3oQQJVbYtyQdh');

getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
).then(tokenAccount => {
    console.log(`Token account: ${tokenAccount.address.toBase58()}`);

    const link = getExplorerLink('address', tokenAccount.address.toBase58(), 'devnet');

    console.log(`Created token account: ${link}`);
})