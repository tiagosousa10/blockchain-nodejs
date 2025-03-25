const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS'
}


class P2pServer {
  constructor (blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool= transactionPool;
    this.socket = [];
  }


  listen() {
    const server = new Websocket.Server({port : P2P_PORT})
    server.on('connection', (socket) => this.connectSocket(socket)) //cria uma conexão com o socket

    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
  }


  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer) //cria um socket
      socket.on('open', () => this.connectSocket(socket))  //cria uma conexão com o socket
    })

    //ws://localhost:5001
  }


  connectSocket(socket) {
    this.socket.push(socket);
    console.log('Socket connected')

    this.messageHandler(socket) //cria uma conexão com o socket
    this.sendChain(socket) //envia a cadeia
  }


  sendChain(socket) {
    socket.send(JSON.stringify({type: MESSAGE_TYPES.chain, chain: this.blockchain.chain})) //envia uma mensagem

  }


  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({type: MESSAGE_TYPES.transaction, transaction}))
  }


  messageHandler(socket){
    
    socket.on('message', message => {
      const data = JSON.parse(message) //transforma o json em um objeto
      switch(data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain) //substitui a cadeia
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction) //atualiza ou adiciona a transação
          break;
        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear() //limpa as transações
          break;
          
      }
      this.blockchain.replaceChain(data) //substitui a cadeia
    })
  }


  syncChain(){
    this.socket.forEach(socket => this.sendChain(socket)) //envia a cadeia
  }


  broadcastTransaction(transaction) {
    this.socket.forEach(socket => this.sendTransaction(socket, transaction)) //envia a transação
  }

  broadcastClearTransactions() {
    this.socket.forEach(socket => socket.send(JSON.stringify({
      type: MESSAGE_TYPES.clear_transactions
    })))

  };
}


module.exports = P2pServer;
