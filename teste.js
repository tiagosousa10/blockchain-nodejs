const Block = require('./block.js');

//                     timestamp,   lastHash,          hash,            data
const block = new Block('7654', '321321dawhdhwa', '138218dwadwadwadaw', '100')
console.log(block.toString())
console.log(Block.genesis().toString())

const primeiroBloco = Block.mineBlock(Block.genesis(), '$500')
console.log(primeiroBloco.toString())



