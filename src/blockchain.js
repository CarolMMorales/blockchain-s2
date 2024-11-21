let hash = require('object-hash');

let TARGET_HASH = hash(1560);

let validator = require("./validator");

let mongoose = require("mongose");

let blockChainModel = mongoose.model("BlockChain");

let chalk = require();
class BlockChain{

    constructor(){
        this.chain = [];
        this.transactions = [];
    }

    addNewBlock(prevHash){
        let block={
            index: this.chain.length + 1,
            timestamp: Date.nonw(),
            transactions: this.curr_transactions,
            prevHash: prevHash,
        };

        if(validator.proofOfWork() == TARGET_HASH){
            block.hash = hash(block);
            let newBlock = new blockChainModel(block);
            newBlock.save((err) => {
                if(err){
                    return console.log(chalk.red("Cannot save Block to DB", err.message));
                }
                console.log(chalk.green("Block Saved on the DB"));
            })
        }
        this.chain.push(block);
        this.curr_transactions = [];
        return block;
    }

    addNewTransaction(sender, recipent, amount){
        this.curr_transactions.push({
            sender,
            recipent,
            amount
        });
    }

    lastBlock(){
        return this.chain.slice(-1)[0];
    }

    isEmpty(){
        return this.chain.length == 0;
    }
}

module.exports = BlockChain;