import hre from 'hardhat'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { MerkleTree } from 'merkletreejs'
import { Contract, ContractFactory } from 'ethers'
import { getCodeFromScriptPath, getLeafFromScriptPath } from '../utils'

const recipient = '0x' + '11'.repeat(20)
const transferAmount = 200
const dummyInvalidProof = [
  '0x' + '11'.repeat(32),
  '0x' + '22'.repeat(32),
  '0x' + '33'.repeat(32),
]

describe('ExampleScripts', function () {
  let ScriptTree: ContractFactory
  let scriptTree: Contract
  let tree: MerkleTree
  let root: String
  before(async () => {
    ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
    tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/scripts/ExampleScript1.sol',
        './contracts/scripts/ExampleScript_SpeedBump.sol',
      ],
    })
    root = tree.getRoot().toString('hex')
    scriptTree = await (
      await ScriptTree.deploy('0x' + root, { value: transferAmount })
    ).deployed()
  })

  describe('SpeedLimit Example', () => {
    before('Do the first spend', async () => {
      const scriptToUse = './contracts/scripts/ExampleScript1.sol'
      const code = getCodeFromScriptPath(scriptToUse)
      const leaf = getLeafFromScriptPath(scriptToUse).toString('hex')
      const proof = tree.getHexProof(leaf)

      await scriptTree.spend(recipient, transferAmount, '0x', code, proof)
    })
    it('Should fail to spend twice in one day', async () => {
      const scriptToUse = './contracts/scripts/ExampleScript_SpeedBump.sol'
      const code = getCodeFromScriptPath(scriptToUse)
      const leaf = getLeafFromScriptPath(scriptToUse).toString('hex')
      const proof = tree.getHexProof(leaf)

      await expect(
        scriptTree.spend(recipient, transferAmount, '0x', code, proof)
      ).to.be.revertedWith('')
    })
  })
})
