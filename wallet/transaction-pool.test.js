const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index');
const { beforeEach } = require('node:test');

describe('TransactionPool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction =  Transaction.newTransaction(wallet, 'r4nd0m-4ddr3ss', 30);
    tp.updateOrAddTransaction(transaction);
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
})
