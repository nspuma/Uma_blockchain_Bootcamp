const fs = require("fs");

class Blockchain {
    constructor() {
        this._blocks = [];
    }

    get_blocks() {
        return this._blocks;
    }

    add_block(block) {
        this._blocks.push(block);
    }

    get_blocks_count() {
        return this._blocks.length;
    }

    get_recently_added_block() {
        if (this.get_blocks_count() > 0) {
            return this._blocks.slice(-1).pop();
        }
        return null;
    }

    validate_chain() {
        // TO-DO: Write your logic to check whether the whole chain is valid
        console.log('inside validate chain' );
        console.log(this._blocks.length);
        var ret = false;
        //for(var k in sthis._blocks) {
        for( var k =0; k< this._blocks.length; k++) {
            console.log(k, this._blocks[k]._prev_hash);
            console.log(k, this._blocks[k]._hash);
            if (k != '0' )
            {                 
                if(this._blocks[k]._prev_hash == this._blocks[k-1]._hash)
                {
                    console.log('valid chain');
                    ret = true;
                }
                else{                    
                    ret = false;
                }               
            }
         }
        return ret;
    }
}

module.exports = Blockchain;