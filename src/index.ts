import crpyto from "crypto";

interface BlockShpae {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShpae {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crpyto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks]; // blocks 배열의 내용물만 복사한 새로운 배열을 만들어 반환
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First One");
blockchain.addBlock("Second One");
blockchain.addBlock("Third One");

console.log(blockchain.getBlocks());
