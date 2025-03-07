const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // bitcoin use secp256k1

class ChainUtil{ //utilidade da cadeia de blocos

  static genKeyPair(){
    return ec.genKeyPair() //gera uma chave publica e privada

  }

}


module.exports = ChainUtil;
