import 'dotenv/config';
import { 
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl
} from '@solana/web3.js';
import { mintTo } from '@solana/spl-token';
import { getExplorerLink } from '@solana-developers/helpers';

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log('Add SECRET_KEY to .env');
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey('GmjBpaTDUWr9AAkoZMHURjdRRiR4jAA5dNSZKBWAuxR2');

const recipientAssociatedTokenAccount = new PublicKey('6NWyTDD7qroQBA9qze9WGQkvDPN12jEsgyvqz6iiT84t');

mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
).then(transactionSignature => {
    const link = getExplorerLink('transaction', transactionSignature, 'devnet');

    console.log(`Success! Mint Token Transaction: ${link}`);
})