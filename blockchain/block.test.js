const Block = require('./block.js');
// const {DIFFICULTY} = require('../config')


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
    expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty)) // 0 a 4 posições que se repete 4 vezes
  })

  it('lowers the difficulty for slowly mined blocks', () => {
    // quer dizer que se o tempo de mineração for maior que 1 hora, a dificuldade diminui
    expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty  - 1)
  })

  it('raises the difficulty for quickly mined blocks', () => {
    // quer dizer que se o tempo de mineração for menor que 1 hora, a dificuldade aumenta
    expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1)
  })
})
