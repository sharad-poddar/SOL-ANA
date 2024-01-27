import * as web3 from '@solana/web3.js';

// getting balance from devnet solana
async function getBalanceUsingWeb3(){

    // here connection is class constructor
    // connecting with devnet test chain of solana
    const connection = await new web3.Connection(web3.clusterApiUrl('devnet'));
    return connection.getBalance(address);

}

// AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd
// never used directly the public key
const address = new web3.PublicKey('AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd');
console.log('public key -> ',address);


async function main(){
    try{
        
        // here we get the balance in lamport
        const balance = await getBalanceUsingWeb3(address);
        console.log(balance);
        
        //converting balance in solana
        const balanceInSolana = balance/(web3.LAMPORTS_PER_SOL);
        console.log(balanceInSolana);

    }catch(error){
        console.log(error);
    }
}

main();
