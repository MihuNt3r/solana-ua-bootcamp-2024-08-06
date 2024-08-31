import 'dotenv/config';
import { 
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction,
    TransactionInstruction
} from '@solana/web3.js';

let privateKey = process.env['SECRET_KEY'];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

console.log(`Our public key is ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey('CUg6m4NywWfjQw4v8tiLmLuggnuKpiDb2fiRQ7VaLbsh');

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

transaction.add(
new TransactionInstruction({
    keys: [
    { pubkey: sender.publicKey, isSigner: true, isWritable: true },
    ],
    data: Buffer.from("Memo message to send in this transaction", "utf-8"),
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
}),
);

sendAndConfirmTransaction(connection, transaction, [
    sender
]).then(signature => {
    console.log('Transaction confirmed, signature: ', signature);
})