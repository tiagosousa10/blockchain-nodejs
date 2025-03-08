const Transaction = require('./transaction')
const Wallet = require('./index');
const { beforeEach } = require('node:test');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = '8lockch4in';
    transaction= Transaction.newTransaction(wallet, recipient, amount);
  })
})
