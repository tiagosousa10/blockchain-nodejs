const ChainUtil = require('./chain-util');

const {DIFFICULTY, MINE_RATE} = require('../config')

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) { 
    this.timestamp = timestamp; // time when block was created
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce; // number used to mine the block 
    this.difficulty = difficulty || DIFFICULTY;
  }


  toString() {
    return `
    Block =
            Timestamp = ${this.timestamp}
            lastHash = ${this.lastHash}
            hash = ${this.hash.substring(0, 10)} 
            Nonce = ${this.nonce}
            Difficulty = ${this.difficulty}
            data: ${this.data}
            `
  }

  // use 'new this' to call the constructor
  static genesis() { 
    return new this('Genesis time', '-------','JFGWADWADWA32',[],0, DIFFICULTY)
  }

  static mineBlock(lastBlock, data) {

    let hash, timestamp; // variáveis locais
    const lastHash = lastBlock.hash; // hash do bloco anterior
    let {difficulty} = lastBlock; // destructuring
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now(); 
      difficulty= Block.adjustDifficulty(lastBlock, timestamp); //ajusta a dificuldade
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty) //using static hash created
    } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty)) // 0 a 4 posições que se repete 4 vezes

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }


  //SHA - 256 -> hash do bloco
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static blockHash(block) {
    const {timestamp, lastHash, data, nonce, difficulty} = block; //destructuring

    return Block.hash(timestamp, lastHash, data, nonce, difficulty)
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let {difficulty} = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1; //ajustar a dificuldade

    return difficulty
  }

}

module.exports = Block;
