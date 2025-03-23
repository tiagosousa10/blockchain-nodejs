const express = require('express')
const Blockchain = require('../blockchain');
const TransactionPool = require('../wallet/transaction-pool');
const Wallet = require('../wallet');
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const P2pServer = require('./p2p-server')

//----- INSTANCES -----
const app = express()
const bc = new Blockchain()
const tp = new TransactionPool()
const wallet = new Wallet()
const p2pServer = new P2pServer(bc, tp) //cria um servidor p2p que recebe a cadeia de blocos

app.use(express.json()) // middleware para processar json

//----- ROUTES -----
app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.post('/mine', (req,res) => {
  const block = bc.addBlock(req.body.data) //cria um novo bloco
  console.log(`New block added: ${block.toString()}`) //imprime o novo bloco

  p2pServer.syncChain() //sincroniza a cadeia

  res.redirect('/blocks') //redireciona para a rota /blocks
})

app.get('/transactions', (req,res) => {
  res.json(tp.transactions)
})

app.post('/transact', (req,res) => {
  const {recipient, amount} = req.body;

  const transaction = wallet.createTransaction(recipient, amount, tp)
  p2pServer.broadcastTransaction(transaction)

  res.redirect('/transactions') //redireciona para a rota /transactions
})

app.get('/public-key', (req,res) => {
  res.json({publicKey: wallet.publicKey})
})


// ----- LISTENERS -----
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen();
