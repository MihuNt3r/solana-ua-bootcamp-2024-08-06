import 'dotenv/config';
import { 
    Keypair,
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction
} from '@solana/web3.js';
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { getExplorerLink } from '@solana-developers/helpers';
let privateKey = process.env['SECRET_KEY'];

const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

const tokenMintAccount = new PublicKey('GmjBpaTDUWr9AAkoZMHURjdRRiR4jAA5dNSZKBWAuxR2');

const metadataData = {
    name: 'Solana UA Bootcamp 2024-08-06',
    symbol: 'UAB-8',
    uri: 'https://arweave.net/1234',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
}

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const transaction = new Transaction();

const createMetadataAccountInstruction = 
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true
            }
        }
    );


transaction.add(createMetadataAccountInstruction);

sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
).then(() => {
    const tokenMintLink = getExplorerLink('address', tokenMintAccount.toString(), 'devnet');

    console.log(`Look at the token mint again: ${tokenMintLink}`);
})