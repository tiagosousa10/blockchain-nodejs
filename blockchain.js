const Block = require('./block.js');  

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];   
  }

  addBlock(data){
    const lastBlock = this.chain[this.chain.length - 1] //pega o ultimo bloco
    const block = Block.mineBlock(lastBlock, data) //cria um novo bloco
    this.chain.push(block)

    return block;
  }
}
