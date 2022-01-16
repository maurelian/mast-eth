import hre from 'hardhat'
import { expect } from 'chai'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

import { getLeafFromScriptPath, getCodeFromScriptPath } from '../utils'

describe('Tasks', function () {
  it.skip('Should generate the expected root value for a couple scripts', async () => {
    // we have to define these paths relative to the root dir.
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/scripts/ExampleScript1.sol',
        './contracts/scripts/ExampleScript2.sol',
      ],
    })
    const root = tree.getRoot().toString('hex')
    expect(root.length).to.be.be.equal(64)

    // This is just checking against a value the scripts generated previously,
    // good enough for now.
    expect(root).to.be.deep.equal(
      'caacc7a5e3143fb97da46af7f198b4e85f7fb35ac52ca3c332e9339270546c5f'
    )
  })

  it('Successfully verifies a valid Merkle proof in MerkleTreeJs', async () => {
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/scripts/ExampleScript1.sol',
        './contracts/scripts/ExampleScript2.sol',
      ],
    })

    const root = tree.getHexRoot()
    const leaf = getLeafFromScriptPath('./contracts/scripts/ExampleScript1.sol')

    const proof = tree.getHexProof(leaf)

    expect(await tree.verify(proof, leaf, root)).to.be.true
  })

  it('Successfully verifies a valid Merkle proof in Solidity', async function () {
    const merkleProofWrapper = await (
      await hre.ethers.getContractFactory('MerkleProofWrapper')
    ).deploy()

    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/scripts/ExampleScript1.sol',
        './contracts/scripts/ExampleScript2.sol',
      ],
    })

    const root = tree.getHexRoot()
    const leaf = getLeafFromScriptPath('./contracts/scripts/ExampleScript1.sol')
    const proof = tree.getHexProof(leaf)

    expect(await merkleProofWrapper.verify(proof, root, leaf)).to.equal(true)
  })
})
