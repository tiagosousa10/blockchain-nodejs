
const Blockchain = require('./blockchain.js');
const Block = require('./block.js');

describe('Blockchain', () => {
  let bc; //blockchain
  let bc2;

  beforeEach(() => {
    bc = new Blockchain;
    bc2 = new Blockchain;
  })

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis()) //compara o bloco 0 com o bloco genesis
  })

  it('adds a new block', () => {
    const data = 'ficheiro.pdf'
    bc.addBlock(data)

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {  
    bc2.chain[0].data = '0$';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });


  it('invalidates a corrupt chain', () => {

    bc2.addBlock('200$');
    bc2.chain[1].data = '333$'; //altera o bloco 1

    expect(bc.isValidChain(bc2.chain)).toBe(false);
    
  })

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('600$')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).toEqual(bc2.chain);
  })

  it('does not replace the chain with one of less or equal length', () => {
    bc.addBlock('200$')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).not.toEqual(bc2.chain);
  })
})
