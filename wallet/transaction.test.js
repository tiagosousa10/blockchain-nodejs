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
  it('output the `amount`subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount)
  })
  it('output `amount`added to recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount)
  })
})
