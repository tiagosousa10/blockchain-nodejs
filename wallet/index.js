const ChainUtil = require('../chain-util/chain-util');
const {INITIAL_BALANCE} = require('../config');


class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPar = ChainUtil.genKeyPair(); //gera uma chave publica e privada 
    this.publicKey = this.keyPar.getPublic().encode('hex'); //pega a chave publica e codifica em hexadecimal
  }


  toString() {
    return `
      Wallet -
        publicKey: ${this.publicKey.toString()}
        balance: ${this.balance}
    `
  }

  sign(dataHash) {
    return this.keyPar.sign(dataHash) //gera uma assinatura
  }
}


module.exports = Wallet;
