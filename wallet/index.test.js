const { beforeEach } = require('node:test');
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool')
const Blockchain = require('../blockchain');
const { INITIAL_BALANCE } = require('../config');

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

  describe('calculate a balance', () => {
    let addBalance, repeatAdd, senderWallet;

    beforeEach(() => {
      senderWallet = new Wallet();
      addBalance = 100;
      repeatAdd = 3;

      // adiciona balance ao senderWallet
      for(i=0; i<repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp)
      }

      bc.addBlock(tp.transactions)
    })

    it('calculate the balance for blockchain transactions matching the recipient', () => {
      expect(wallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd))
    })
    it('calculate the balance for blockchain transactions matching the sender', () => {
      expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd))
    })
  })
})
