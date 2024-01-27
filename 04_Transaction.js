import * as web3 from '@solana/web3.js';
import bs58 from 'bs58'

const getKeyPair = async()=>{
    const decodedPrivateKey = await bs58.decode('596LTgbttvDaXfDEktye7rQemqRiA8JX8ry96gf44KYEXuuimbTdHJhyUxx4UdTtMiepE1Ha7WBMTJKtLuJhDa6W')
    console.log(decodedPrivateKey);
    const u8APrivateKey = await new Uint8Array(decodedPrivateKey);
    console.log(u8APrivateKey);
    const keyPair = await web3.Keypair.fromSecretKey(u8APrivateKey);
    return keyPair;
}


const main = async()=>{
 
    const sender = new web3.PublicKey('GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA');
    const recepient = new web3.PublicKey('AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd');
    console.log('sender -> ',sender);
    console.log('receiver -> ',recepient);

    try{

        // making an connection
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

        // formation of transaction
        const txn = new web3.Transaction();
        const sendSolInst = web3.SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: recepient,
            // amount converted into lamports
            lamports: web3.LAMPORTS_PER_SOL * 0.2,
        })
        // adding instructions to txn
        txn.add(sendSolInst);
        console.log(txn);

        // getting signers keys from helper function
        const accountKey = await getKeyPair();
        console.log(accountKey);

        // sending of transaction
        await web3.sendAndConfirmTransaction(connection, txn, [accountKey]);

    }catch(error){
        console.log(error);
    }

}

main();