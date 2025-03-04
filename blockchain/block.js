const SHA256 = require('crypto-js/sha256')

const DIFFICULTY = 4; // dificuldade para minerar o bloco

class Block {
  constructor(timestamp, lastHash, hash, data, nonce) { 
    this.timestamp = timestamp; // time when block was created
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }


  toString() {
    return `
    Block =
            Timestamp = ${this.timestamp}
            lastHash = ${this.lastHash}
            hash = ${this.hash.substring(0, 10)} 
            Nonce = ${this.nonce}
            data: ${this.data}
            `
  }

  // use 'new this' to call the constructor
  static genesis() { 
    return new this('Genesis time', '-------','JFGWADWADWA32',[],0)
  }

  static mineBlock(lastBlock, data) {

    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now(); 
      hash = Block.hash(timestamp, lastHash, data, nonce) //using static hash created
    } while()

    return new this(timestamp, lastHash, hash, data);
  }


  //SHA - 256 -> hash do bloco
  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
}

  static blockHash(block) {
    const {timestamp, lastHash, data, nonce} = block; //destructuring

    return Block.hash(timestamp, lastHash, data, nonce)
  }

}


module.exports = Block;
