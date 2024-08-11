import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
console.log('Connected to devnet');

const publicKey = new PublicKey('CUg6m4NywWfjQw4v8tiLmLuggnuKpiDb2fiRQ7VaLbsh')

connection.getBalance(publicKey).then(balanceInLamports => {
    // console.log(balanceInLamports);

    const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`The balance for the wallet at address ${publicKey} is: ${balanceInSol}`);
});