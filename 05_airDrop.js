import * as web3 from '@solana/web3.js';
import * as fs from 'fs';

import dotenv from 'dotenv'
dotenv.config();

const getSigner = async()=>{
        const signer = web3.Keypair.generate();
        console.log('keypair -> ',signer);

        console.log('creating and .env file');
        // data must be store in form of array
        fs.writeFileSync('.env',`PRIVATE_KEY=[${signer.secretKey.toString()}]`);
}

const main = async()=>{
    try{

        if(!process.env.PRIVATE_KEY){
            await getSigner();
        }

        const privateKeyInString = process.env.PRIVATE_KEY;
        console.log('fetched private key -> ', privateKeyInString, typeof(privateKeyInString));
        
        const privateKeyInJson = JSON.parse(privateKeyInString);
        console.log('private key in JSON -> ', privateKeyInJson, typeof(privateKeyInJson));

        const privateKey = Uint8Array.from(privateKeyInJson);
        console.log('private key -> ',privateKey);

        const signer = await web3.Keypair.fromSecretKey(privateKey);
        console.log('signer -> ',signer);

        return signer;
    }catch(error){
        console.log(error);
    }
}

// we can airdrop the sol only limited times in a day
const airDropIfNeeded = async(signer, connection)=>{

    const balance = await connection.getBalance(signer.publicKey);
    console.log('balance -> ', balance/web3.LAMPORTS_PER_SOL, 'SOL');

    if(balance/web3.LAMPORTS_PER_SOL < 10){
        console.log('airdroping 1 SOL');
        
        // airdroping 2 SOL
        // transaction is already send to chain
        const airdropSOL = await connection.requestAirdrop(
            signer.publicKey,
            web3.LAMPORTS_PER_SOL * 2
        )

        const latestBlockhash = await connection.getLatestBlockhash();
        console.log('latestBlockhash -> ',latestBlockhash);

        // confirming transaction
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: signer
        })

        const balance = await connection.getBalance(signer.publicKey);
        console.log('balance -> ', balance/web3.LAMPORTS_PER_SOL, 'SOL');
    }
}


const getMain = async()=>{
    try{

        // connecting with chain
        const connection = await new web3.Connection(web3.clusterApiUrl('devnet'));
        
        // getting keypairs as signers
        const signer = await main();
        console.log('public key -> ',signer.publicKey.toString());

        // airdroping
        await airDropIfNeeded(signer, connection);

    }catch(error){
        console.log(error);
    }
}

getMain();