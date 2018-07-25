const crypto = require("crypto");
const Transaction = require("./transaction");
const Blockchain = require("./blockchain");
const Helper = require("./helper");

class Block {
    constructor(blockchain = new Blockchain()) {
        this._transactions = [];
        this._prev_hash = (blockchain.get_blocks_count() > 0) ?
            blockchain.get_recently_added_block()._hash : null;
        this._height = blockchain.get_blocks_count() + 1;
        this._hash = null;
        this._timestamp = new Date().getTime();
        this._transaction_count = 0;
    }

    _hash_transactions() {

        // TO-DO: Write your logic to hash all the transactions
        var curr_txn = "";        
        console.log(this._transactions.length);
        for( var i =0; i< this._transactions.length; i++) 
        {
            //console.log('uma test');
            //console.log( this._transactions[i]);
            //console.log(i);
            //JSON.stringify(this._transactions[i]);
            //console.log('done');
            //console.log(JSON.stringify(this._transactions[i]));
            var curr_txn_concat = curr_txn.concat(JSON.stringify(this._transactions[i]));
            //console.log('curr_txn_concat');
            //console.log(curr_txn_concat);
            curr_txn = crypto.createHash('sha256').update(curr_txn_concat).digest('hex');
            //console.log('curr_txn');
            //console.log(curr_txn);
        }
        return curr_txn;
    }

    _hash_payload() {
        return this._hash_transactions();
    }

    add_transaction(transaction) {
        this._transactions.push(transaction);
        this._transaction_count = this._transactions.length;
    }

    _hash_block() {

        // TO-DO: Write your logic to create block header with below details and return the hash value
        var payload_hash = this._hash_payload();
        //console.log('umaaaaa');
        //console.log(payload_hash);
        let blockheader_data = {
            'payload_hash': payload_hash,
            'timestamp': this._timestamp,
            'prev_hash': this._prev_hash,
            'total_transactions': this._transactions.length
        };
        //replace this with function call -- Uma
        return(crypto.createHash('sha256').update(JSON.stringify(blockheader_data)).digest('hex'));  
    }

    finalize() {
        if(this._hash == null) {
            this._hash = this._hash_block();
        } else {
            throw new Error("Block already finalized");
        }
    }

    validate() {
        // TO-DO: Write your logic to check whether the block is valid
        console.log(this._hash == this._hash_block());
        
        return(this._hash == this._hash_block());
    }

    get_transaction_count() {
        return this._transaction_count;
    }
}

module.exports = Block;