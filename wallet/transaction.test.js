// in wallet/transaction.test.js
const Wallet = require('./index');
const Transaction = require('./transaction');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = '8lockch4in';
    try {
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    } catch (error) {
      console.log(error);
      transaction = null;
    }
  })

  it('output the `amount`subtracted from the wallet balance', () => {
    if (transaction) {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount)
    } else {
      expect(transaction).toBeNull();
    }
  })

  it('output `amount`added to recipient', () => {
    if (transaction) {
      expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount)
    } else {
      expect(transaction).toBeNull();
    }
  })
})
