const Block = require('./block.js');  

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];   
  }

  addBlock(data){
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data) //cria um novo bloco
    this.chain.push(block)

    return block;
  }
}


module.exports = Blockchain;
