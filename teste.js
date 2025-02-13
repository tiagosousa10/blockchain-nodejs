const Block = require('./block.js');

//                     timestamp,   lastHash,          hash,            data
const block = new Block('7654', '321321dawhdhwa', '138218dwadwadwadaw', '100')
console.log(block.toString())
