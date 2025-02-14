const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, lastHash, hash, data) { 
    this.timestamp = timestamp; // time when block was created
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `
    Block =
            Timestamp: ${this.timestamp}
            lastHash: ${this.lastHash}
            hash: ${this.hash.substring(0, 10)} 
            data: ${this.data}
            `
  }

  // use 'new this' to call the constructor
  static genesis() { 
    return new this('Genesis time', '-------','JFGWADWADWA32',[])
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now(); 
    const lastHash = lastBlock.hash;
    const hash = Block.hash(timestamp, lastHash, data) //using static hash created

    return new this(timestamp, lastHash, hash, data);
  }


  //SHA - 256 -> hash do bloco
  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
}

  static blockHash(block) {
    const {timestamp, lastHash, data} = block; //destructuring

    return Block.hash(timestamp, lastHash, data)
  }

}


module.exports = Block;
