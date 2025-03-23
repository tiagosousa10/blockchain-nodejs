const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index');
const { beforeEach, describe } = require('node:test');

describe('TransactionPool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('r4nd0m-4ddr3ss', 50, tp); // cria uma transação
  })

  it('adds a transaction to the pool' , () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
  })

  it('updates a transaction in the pool', () => {
    // se a transação já existir, atualiza ela
    const oldTransaction = JSON.stringify(transaction)
    const newTransaction = Transaction.newTransaction(wallet, 'n3xt-r3cipient',50)
    tp.updateOrAddTransaction(newTransaction)

    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction)
  })

  describe('mixing valid and corrupt transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions]; // copia as transações válidas

      for(let i=0; i<6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd0m-4ddr3ss', 30, tp);

        if(i%2 == 0) { // se o resto da divisão for 0, adiciona a transação ao pool
          transaction.input.amount = 999999;
        } else {
          validTransactions.push(transaction);
        }
      }
    })

    it('shows a difference between valid and corrupt transaction', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions))
    })

    it('grabs valid transactions', () => {
      expect(tp.validTransactions()).toEqual(validTransactions)
    })
  })
})
