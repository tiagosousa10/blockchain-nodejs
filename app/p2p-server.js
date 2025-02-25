const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor (blockchain) {
    this.blockchain = blockchain;
    this.socket = [];
  }
};

listen() {
  const server = new Websocket.Server({port : P2P_PORT})
  server.on('connection', (socket) => this.connectSocket(socket)) //cria uma conexão com o socket
}


connectSocket(socket) {
  this.socket.push(socket);
  console.log('Socket connected')
}
