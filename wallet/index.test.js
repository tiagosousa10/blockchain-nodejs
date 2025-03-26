const { beforeEach } = require('node:test');
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool')
const Blockchain = require('../blockchain');

describe('Wallet', () => {
  let wallet, tp;

  beforeEach(() => {
    wallet = new Wallet();
    tp =  new TransactionPool();
    bc = new Blockchain();
  })

  describe('createTransaction', () => {
    let transaction, sendAmount, recipient;

    beforeEach(() => {
      sendAmount = 50;
      recipient = 'random-addr3ss';
      transaction = wallet.createTransaction(recipient, sendAmount, bc,tp)
    })

    describe('and doing the same transaction',() => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount,bc ,tp)
      })

      it('doubles the `sendAmount`subtracted from the wallet balance', () => {
        if(transaction) {
          expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2)
        } else {
          expect(transaction).toBeUndefined()
        }
      })

      it('clones the `sendAmount` output for the recipient', () => {
        if(transaction) {
          expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount)).toEqual([sendAmount,sendAmount])
        }  else {
          expect(transaction).toBeUndefined()
        }
      })
    })
  })
})
