import hre from 'hardhat'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import keccak256 from 'keccak256'
import { Contract, ContractFactory } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import sha3 from 'js-sha3'
import { getCodeFromScriptPath, getLeafFromScriptPath } from '../utils'

const transferAmount = 200
const dummyInvalidProof = [
  '0x' + '11'.repeat(32),
  '0x' + '22'.repeat(32),
  '0x' + '33'.repeat(32),
]

describe('ScriptTree', function () {
  let recipient: string
  before(async () => {
    recipient = (await ethers.getSigners())[1].address
  })

  let ScriptTree: ContractFactory
  beforeEach(async () => {
    ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
  })

  it('Should return the conditions root hash once deployed', async () => {
    const randRoot =
      '0x' +
      keccak256(
        BigNumber.from(Math.floor(Math.random() * 1024)).toHexString()
      ).toString('hex')
    const scriptTree = await (
      await hre.ethers.getContractFactory('ScriptTree')
    ).deploy(randRoot)
    await scriptTree.deployed()

    expect(await scriptTree.conditionsRoot()).to.equal(randRoot)
  })

  it('Should fail to spend when provided an invalid proof', async () => {
    let scriptTree = await (
      await ScriptTree.deploy(hre.ethers.constants.HashZero, {
        value: 100,
      })
    ).deployed()

    await expect(
      scriptTree.spend(
        recipient,
        transferAmount,
        '0x20',
        '0x604000',
        dummyInvalidProof
      )
    ).to.be.revertedWith('Invalid proof.')
  })

  it('Should succeed when given a valid proof', async () => {
    const recipient = '0x' + '11'.repeat(20)
    const balBefore = await hre.ethers.provider.getBalance(recipient)

    const ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/test/TestScript1.sol',
        './contracts/test/TestScript2.sol',
      ],
    })
    const root = tree.getRoot().toString('hex')
    const code = getCodeFromScriptPath('./contracts/test/TestScript1.sol')
    const leaf = getLeafFromScriptPath(
      './contracts/test/TestScript1.sol'
    ).toString('hex')
    const proof = tree.getHexProof(keccak256(code))

    const scriptTree = await (
      await ScriptTree.deploy('0x' + root, { value: transferAmount })
    ).deployed()
    const tx = await scriptTree.spend(
      recipient,
      transferAmount,
      '0x',
      code,
      proof
    )

    const balAfter = await hre.ethers.provider.getBalance(recipient)
    await expect(
      await (balAfter.sub(balBefore)).gt(0)
    )
  })
})
