const Transaction = require("./transaction");

class TransactionPool {
  constructor () {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction){
    // se a transação já existir, atualiza ela
    // se não existir, adiciona a transação
    let transactionWithId = this.transactions.find(t => t.id === transaction.id)

    if(transactionWithId){
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction; // pega o index da transação

    } else {
      this.transactions.push(transaction) // adiciona a transação
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount
      }, 0)

      // se o total for diferente do input, a transação é inválida
      if(transaction.input.amount !== outputTotal) {
        console.log(`Invalida transaction from ${transaction.input.address}.`)
        return;
      }

      // se a transação não for válida
      if(!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}.`)
        return;
      }

      return transaction;
    })
  }

  clear(){
    this.transactions = [];
  }
}


module.exports = TransactionPool;
