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
}


module.exports = TransactionPool;
