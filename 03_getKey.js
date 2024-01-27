import * as web3 from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
dotenv.config();


const main = async()=>{

    // string
    const privateKey = process.env.PRIVATE_KEY;
    console.log(privateKey, typeof(privateKey));                
    
    // object       
    const decodedPrivateKey = bs58.decode(privateKey);                 
    console.log(decodedPrivateKey, typeof(decodedPrivateKey));
    
    // uint8array with 64 bytes
    const privateKeyIntoUTF8 = await new Uint8Array(decodedPrivateKey);
    console.log('PRIVATE_KEY into u8A array -> ',privateKeyIntoUTF8);

    // getting account from private key
    // it takes only uint8array
    const keyPairFromPrivateKey = await web3.Keypair.fromSecretKey(privateKeyIntoUTF8);
    console.log('keypairs -> ',keyPairFromPrivateKey);

    // getting public key from keypair
    // object
    const publicKey = keyPairFromPrivateKey.publicKey;
    console.log(publicKey, typeof(publicKey));

    // public key into string
    // string
    const publicKeyInString = String(publicKey);
    console.log('public key -> ',publicKeyInString);
}

const anotherMain = async()=>{

    const ownerkeyPair = await web3.Keypair.generate();
    console.log('Ownerpair keyPair -> ',ownerkeyPair);

    // getting public key and private key
    const publicKey = await ownerkeyPair.publicKey;
    const privateKey = await ownerkeyPair.secretKey;
    console.log(publicKey, typeof(publicKey));
    console.log(privateKey, typeof(privateKey));

    // converting public key into string
    const publicKeyInString = String(publicKey);
    console.log(publicKeyInString);

    // converting privateKey into string
    const privateKeyInString = bs58.encode(privateKey);
    console.log(privateKeyInString, typeof(privateKeyInString));

    // bs58.decode / bs58.encode is used to endcode and decode private key
    // public key has no matter with it
    // uint8array private key is used
    
}





main();
anotherMain();
