const ChainUtil = require('../chain-util')

class Transaction {
  constructor() {
    this.id = ChainUtil.id(); // recebe o id da transação
    this.input = null;
    this.outputs = [];
  }
}
