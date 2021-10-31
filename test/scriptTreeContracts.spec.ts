import hre from 'hardhat'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Signer} from 'ethers'

const HashZero = ethers.constants.HashZero
const transferAmount = 200
const dummyInvalidProof = [
        '0x' + '11'.repeat(32),
        '0x' + '22'.repeat(32),
        '0x' + '33'.repeat(32),
      ]

describe('ScriptTree', function () {
  let recipient: string
  before(async () => {
    recipient = (await ethers.getSigners())[0].address
  })

  it('Should return the conditions root hash once deployed', async () => {
    const ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
    const scriptTree = await ScriptTree.deploy(hre.ethers.constants.HashZero)
    await scriptTree.deployed()

    expect(await scriptTree.conditionsRoot()).to.equal(
      hre.ethers.constants.HashZero
    )
  })

  it('Should fail to spend when provided an invalid proof', async () => {
    const ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
    const scriptTree = await (
      await ScriptTree.deploy(hre.ethers.constants.HashZero)
    ).deployed()

    await expect(
      scriptTree.spend(recipient, transferAmount, '0x20', '0x604000', dummyInvalidProof)
    ).to.be.revertedWith('Invalid proof.')
  })

  it('Should succeed when given a valid proof', async () => {
    const ScriptTree = await hre.ethers.getContractFactory('ScriptTree')
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/scripts/ExampleScript1.sol',
        './contracts/scripts/ExampleScript2.sol',
        './contracts/scripts/ExampleScript3.sol',
      ],
    })
    const root = tree.getRoot().toString('hex')
    const code = getCodeFromScriptPath('./contracts/scripts/ExampleScript1.sol')
    const leaf = getLeafFromScriptPath(
      './contracts/scripts/ExampleScript1.sol'
    ).toString('hex')
    const proof = tree.getHexProof(leaf)

    await expect(
      scriptTree.spend(recipient, transferAmount, '0x20', '0x604000', dummyInvalidProof)
    ).to.be.revertedWith('Invalid proof.')
  })
})
