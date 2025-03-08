const EC = require('elliptic').ec;
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1'); // bitcoin use secp256k1

class ChainUtil{ //utilidade da cadeia de blocos

  static genKeyPair(){
    return ec.genKeyPair() //gera uma chave publica e privada
  }

  static id() {
    return uuidV1(); //gera um uuid
  }

}


module.exports = ChainUtil;
