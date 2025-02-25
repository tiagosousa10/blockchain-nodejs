const express = require('express')
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const P2pServer = require('./p2p-server')

const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc) //cria um servidor p2p que recebe a cadeia de blocos

app.use(express.json()) // middleware para processar json

app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.post('/mine', (req,res) => {
  const block = bc.addBlock(req.body.data) //cria um novo bloco
  console.log(`New block added: ${block.toString()}`) //imprime o novo bloco

  res.redirect('/blocks') //redireciona para a rota /blocks
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen();
