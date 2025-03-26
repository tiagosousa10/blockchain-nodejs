const ChainUtil = require('../chain-util/chain-util');
const {INITIAL_BALANCE} = require('../config');
const Transaction = require('./transaction');


class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE || 0;
    this.keyPar = null;
    this.publicKey = null;
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

  createTransaction(recipient, amount, transactionPool) {
    if(amount > this.balance) {
      console.log(`Amount: ${amount} exceeds the current balance: ${this.balance}`)
      return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey); 

    if(transaction) { // se a transação já existir, atualiza ela
      transaction.update(this, recipient, amount);

    } else {
      transaction = Transaction.newTransaction(this, recipient, amount); // se não existir, adiciona a transação

      transactionPool.updateOrAddTransaction(transaction) // atualiza a pool
    }

    return transaction;
  }

  calculateBalance(blockchain) {
    let balance = this.balance;
    let transactions = [];

    // percorre o blockchain e pega todas as transações
    blockchain.chain.forEach(block => block.data.forEach(transaction => {
      transactions.push(transaction);
    }))

    //pega as transações do senderWallet
    const walletInputs = transactions.filter(transaction => transaction.input.address === this.publicKey); 

    let startTime = 0;
    if(walletInputs.length > 0) {
      //pega a transação mais recente
      const recentInput = walletInputs.reduce((prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current); 
    }

    //pega o balance da transação mais recente
    balance = recentInput.outputs.find(output => output.address === this.publicKey).amount;
    startTime = recentInput.input.timestamp;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}


module.exports = Wallet;
