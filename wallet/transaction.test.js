// in wallet/transaction.test.js
const { beforeEach, it, describe } = require('node:test');
const Wallet = require('./index');
const Transaction = require('./transaction');
const { MINING_REWARD } = require('../config');

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

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true)
  })

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false)
  })

// describe('transacting with an amount that exceeds the balance', () =>{
//   let transaction;
  
//   beforeEach(() => {
//     // amount= 5000;
//     transaction = Transaction.newTransaction(wallet,recipient,amount);
//   })

//   it('does not create the transaction' , () => {
//     expect(transaction).toEqual(undefined)
//   })
// })

  describe('update transaction', () => {
    let  nextRecipient, nextAmount;

    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = 'next -> 8lockch4in'
      transaction = transaction.update(wallet,nextRecipient, nextAmount); // update the transaction
    })

    it('subtracts the next amount from the sender output', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance- amount - nextAmount)
    })

    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount)
    })
  })


  describe('creating a reward transaction', () => {
    beforeEach(() => {
      transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    })

    it(`reward the miner's wallet`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amout).toEqual(MINING_REWARD)
    })
  })

})


// describe('transacting with an amount that exceeds the balance', () =>{
//   let wallet = new Wallet();
//   beforeEach(() => {
//     amount = wallet.balance + 1; // ensure the amount exceeds the balance
//     try {
//       transaction = Transaction.newTransaction(wallet, recipient, amount);
//     } catch (error) {
//       console.log(error);
//       transaction = null;
//     }
//   })

//   it('does not create the transaction' , () => {
//     expect(transaction).toBeInstanceOf(Transaction);
//   })
// })
