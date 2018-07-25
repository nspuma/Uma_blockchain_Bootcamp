const fs = require("fs");
const crypto = require("crypto");
const Blockchain = require("./blockchain");
const Block = require("./block");
const Transaction = require("./transaction");

class Helper {

    sha256Hash(data) {
        // TO-DO: Write your logic to create hash of the given data and return 'hex' value
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        console.log('hash is:');
        console.log(hash);
        console.log(data);
        return hash;
    } 

    save_chain(blockchain = new Blockchain()) {
        try {
            fs.writeFileSync("blockchain.json", JSON.stringify(blockchain.get_blocks()));
            console.log("\nBlockchain saved successfully into file blockchain.json");
        } catch(err) {
            console.log(`Error while writing blocks to file ${err}`);
        }
    }

    load_chain() {
        let blockchain = new Blockchain();
        try {
            let data = fs.readFileSync("blockchain.json");
            let arr = JSON.parse(data);
            for(let item of arr) {
                blockchain.add_block(Object.assign(new Block(), item));
            }
        } catch(err) {
            console.log(`Error while loading blocks from file ${err}`);
        }
        return blockchain;
    }
}

module.exports = new Helper();