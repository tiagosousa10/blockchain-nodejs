const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];


class P2pServer {
  constructor (blockchain) {
    this.blockchain = blockchain;
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
    socket.send(JSON.stringify(this.blockchain.chain)) //envia uma mensagem

  }

  messageHandler(socket){
    
    socket.on('message', message => {
      const data = JSON.parse(message) //transforma o json em um objeto

      this.blockchain.replaceChain(data) //substitui a cadeia
    })
  }

  syncChain(){
    this.socket.forEach(socket => this.sendChain(socket)) //envia a cadeia
  
  }

};



module.exports = P2pServer;
