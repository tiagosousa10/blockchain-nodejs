// in wallet/transaction.test.js
const { beforeEach } = require('node:test');
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
      expect(transaction).toEqual(undefined);
    }
  })

  it('output `amount`added to recipient', () => {
    if (transaction) {
      expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount)
    } else {
      expect(transaction).toEqual(undefined)
    }
  })

  it('inputs the balance of the wallet', () => {
    if(transaction ) {
      expect(transaction.input.amount).toEqual(wallet.balance)
    } else {
      expect(transaction).toEqual(undefined)
    }
  })
})

describe('transacting with an amount that exceeds the balance', () =>{
  let transaction;
  
  beforeEach(() => {
    amount= 5000;
    transaction = Transaction.newTransaction(wallet,recipient,amount);
  })

  it('does not create the transaction' , () => {
    expect(transaction).toEqual(undefined)
  })
})
