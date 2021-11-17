import {
    createBlockEvent,
    HandleBlock
  } from "forta-agent"
  import agent from "./agent"
  
  describe("diffchanged agent", () => {
    let handleBlock: HandleBlock
  
    const createTxEventWithType= (type: number) => createBlockEvent({
      type:type,
      block:{
          difficulty: "",
          gasLimit :"",
          extraData:{} as any,
          gasUsed:"",
          hash:"",
          miner:"",
          logsBloom:"",
          mixHash:"",
          nonce:"",
          number:12563642,
          parentHash:"",
          receiptsRoot:"",
          sha3Uncles:"",
          size:"",
          stateRoot:"",
          timestamp:1,
          totalDifficulty:"",
          transactions: {} as any,
          transactionsRoot:'',
          uncles:[]
      }
    })
  
    beforeAll(() => {
      handleBlock = agent.handleBlock
    })
  
    describe("handle block", () => {
      it("time spended between 12563642 and 12563641 blocks ", async () => {
        const txEvent = createTxEventWithType(0)
  
        const findings = await handleBlock(txEvent)
  
        expect(findings[0].metadata.time).toStrictEqual("3")
      })
  
      
    })
  })