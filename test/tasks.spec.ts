import hre from 'hardhat'
import { expect } from 'chai'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

import { getLeafFromScriptPath, getCodeFromScriptPath } from '../utils'

describe('Tasks', function () {
  it('Should generate the expected root value for a couple scripts', async () => {
    // we have to define these paths relative to the root dir.
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/test/TestScript1.sol',
        './contracts/test/TestScript2.sol',
      ],
    })
    const root = tree.getRoot().toString('hex')
    expect(root.length).to.be.be.equal(64)

    // This is just checking against a value the scripts generated previously,
    // good enough for now.
    expect(root).to.be.deep.equal(
      'b257d674f75f6c3e513f8974f4acc48469e99a28e0e04f33a0994dfe51de9ec7'
    )
  })

  it('Successfully verifies a valid Merkle proof in MerkleTreeJs', async () => {
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/test/TestScript1.sol',
        './contracts/test/TestScript2.sol',
      ],
    })

    const root = tree.getHexRoot()
    const leaf = getLeafFromScriptPath('./contracts/test/TestScript1.sol')

    const proof = tree.getHexProof(leaf)

    expect(await tree.verify(proof, leaf, root)).to.be.true
  })

  it('Successfully verifies a valid Merkle proof in Solidity', async function () {
    const merkleProofWrapper = await (
      await hre.ethers.getContractFactory('MerkleProofWrapper')
    ).deploy()

    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/test/TestScript1.sol',
        './contracts/test/TestScript2.sol',
      ],
    })

    const root = tree.getHexRoot()
    const leaf = getLeafFromScriptPath('./contracts/test/TestScript1.sol')
    const proof = tree.getHexProof(leaf)

    expect(await merkleProofWrapper.verify(proof, root, leaf)).to.equal(true)
  })
})
