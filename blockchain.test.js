
const Blockchain = require('./blockchain.js');
const Block = require('./block.js');

describe('Blockchain', () => {
  let bc; //blockchain

  beforeEach(() => {
    bc = new Blockchain;
  })

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis()) //compara o bloco 0 com o bloco genesis
  })

  it('adds a new block', () => {
    const data = 'ficheiro.pdf'
    bc.addBlock(data)

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })
})
