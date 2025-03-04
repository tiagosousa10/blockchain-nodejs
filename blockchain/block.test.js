const Block = require('./block.js');
const {DIFFICULTY} = require('../config')


describe('Block', () => {

  let data, lastBlock, block;

  beforeEach(() => { //função executada antes de cada it
    data = 'index.html';
    lastBlock = Block.genesis(); 
    block = Block.mineBlock(lastBlock, data)
  })

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data);
  });

  it('sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  });

  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0,DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY)) // 0 a 4 posições que se repete 4 vezes
  })
})
