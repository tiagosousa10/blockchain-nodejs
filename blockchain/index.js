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
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if(newChain.length <= this.chain.length) { //verifica se a nova cadeia é menor que a atual
      console.log('Received chain is not longer than current chain');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('Received chain is not valid');
      return;
    }
    console.log('Replacing chain with a longer chain');
    this.chain = newChain; //atualiza a cadeia com a cadeia recebida
  }

}

module.exports = Blockchain;
