let database = require("./src/database");

database.onConnect(() => {

    let BlockChain = require ("./src/blockchain");

    let blockChain = new BlockChain();

    let hash = require('object-hash');

    let PROOF = 1560;

    if(proofOfWork() == PROOF){
        blockChain.addNewTransaction("islem", "alex", 200);
        let prevHash = blockChain.lastBlock() ? 
            blockChain
            .lastBlock()
            .hash : 
            null;
        blockChain.addNewBlock(prevHash)
    }
    console.log("Chain: ", blockChain.chain);
})