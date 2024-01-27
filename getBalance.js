//1. gettingBalance using JSON-RPCURL endpoint
//2. this is internal part we can do directly by solana's Web3.js sdk

async function getBalanceUsingJSONRPC(address: string): Promise<number>{
    const url = clusterApiUrl('devnet');
    console.log(url);

    //2. taking balance while posting the account address
    //3. balance can be in lamports(smallest unit of solana)/solana
    return fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [
                address
            ]
        })
    }).then(res => res.json())
        .then(json => {
            if(json.error){
                throw json.error;
            }
            console.log(json);
            return json['result']['value'] as number;
        }).catch((error)=>{
            console.log(error);
            throw error;
        })
}