const ChainUtil = require('../chain-util/chain-util')

class Transaction {
  constructor() {
    this.id = ChainUtil.id(); // recebe o id da transação
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if(amount > senderWallet.balance) { // se o amount for maior que o balance do senderWallet
      console.log(`Amount: ${amount} exceeds the current balance`);
      throw new Error('Amount exceeds the current balance');
    }

    transaction.outputs.push(
      ...[{amount: senderWallet.balance - amount, address: senderWallet.publicKey}, //senderWallet
        {amount, address: recipient }] //recipient
    )

    return transaction;

  }
}


module.exports = Transaction;
