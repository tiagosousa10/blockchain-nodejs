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

  isValidChain(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
  }

  for(let i = 1 ; i < chain.length; i++) {
    const block = chain[i];
    const lastBlock = chain[i - 1];

    //verifica se o hash do bloco é valido
    if(block.lastBlock !== lastBlock.hash || block.hash !== Block.blockHash(block)) { 
      return false
    }
  }
  return true;
}

}

module.exports = Blockchain;
