import BigNumber from 'bignumber.js';
import { 
  BlockEvent, 
  Finding, 
  HandleBlock, 
  FindingSeverity, 
  FindingType,
  getJsonRpcUrl
} from 'forta-agent'


import Web3 from 'web3';
const web3 = new Web3(getJsonRpcUrl())

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const findings: Finding[] = [];
  const prevBlock = await web3.eth.getBlock(blockEvent.blockNumber-1)

  if (prevBlock.timestamp){
    const currentTime = new BigNumber(blockEvent.block.timestamp)
    const prevTime = new BigNumber(prevBlock.timestamp)

    const time = currentTime.minus(prevTime)
    findings.push(Finding.fromObject({
      name: "TIME_BEETWEEN_BLOCKS",
      description: `Time spended to new block creating`,
      alertId: "FORTA-600",
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      metadata:{
        time: `${time.toString()}`
      }
    }))
  }
  
  return findings;
}

export default {
  handleBlock
}