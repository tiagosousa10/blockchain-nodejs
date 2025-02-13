class Block {
  constructor(timestamp, lastHash, hash, data) { 
    this.timestamp = timestamp; // time when block was created
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `
    Block =
            Timestamp: ${this.timestamp}
            lastHash: ${this.lastHash}
            hash: ${this.hash}
            data: ${this.data}
            `
  }
}
