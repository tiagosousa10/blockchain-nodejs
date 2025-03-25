const ChainUtil = require('../chain-util/chain-util')
const {MINING_REWARD} = require('../config')

class Transaction {
  constructor() {
    this.id = ChainUtil.id(); // recebe o id da transação
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet,recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey); //pega o output do senderWallet
    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds the current balance`);
      return;
    } 
    senderOutput.amount = senderOutput.amount - amount; //subtrai o amount do senderWallet
    this.outputs.push({amount, address: recipient}); //adiciona o amount ao recipient
    Transaction.signTransaction(this, senderWallet) //assina a transação

    return this;
  }


  static newTransaction(senderWallet, recipient, amount) {

    if(amount > senderWallet.balance) { // se o amount for maior que o balance do senderWallet
      console.log(`Amount: ${amount} exceeds the current balance`);
      return undefined;
    }

    return Transaction.transactionWithOutputs(senderWallet,[{amount: senderWallet.balance - amount, address: senderWallet.publicKey}, //senderWallet
      {amount, address: recipient }] )

  }

  static rewardTransaction(minerWallet, blockchainWallet) {
    return Transaction.transactionWithOutputs(blockchainWallet, [{
      amount: MINING_REWARD, 
      address: minerWallet.publicKey
    }])
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs)// adiciona os outputs
    Transaction.signTransaction(transaction, senderWallet); // assina a transação

    return transaction;

  }


  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }


  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    )
  }
}


module.exports = Transaction;
