import { subtask, task } from 'hardhat/config'
// import * as hre from 'hardhat'
import '@nomiclabs/hardhat-waffle'
import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'
import * as fs from 'fs'
import * as path from 'path'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'



subtask('mast:getArtifacts', 'A')
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre) => {

    console.log(taskArgs);
    const artifactsPaths = taskArgs.scripts.map((s: string) => {
      let artifactName = path.basename(s, '.sol') + '.json'
      // let artifactName =
      return `${path.join(__dirname, 'artifacts', s)}/${artifactName}`
    })
    console.log('artifactsPaths:', artifactsPaths)
    return artifactsPaths
})



subtask('mast:generateScriptTree', 'Generate and print the merkle tree of scripts')
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre) => {
    const artifactsPaths = hre.run('mast:getArtifacts', { scripts: taskArgs.scripts })

    // const leaves = codes.map((x) => SHA256(x))
    // const tree = new MerkleTree(leaves, SHA256)
    // const root = tree.getRoot().toString('hex')
    // console.log('Save this output:')
    // console.log(tree)
    return tree
  })

task(
  'mast:getScriptRoot',
  'Get the root hash to commit to the main MAST contract'
)
  .addParam('path', 'path to scripts dir')
  .setAction(async (taskArgs, hre) => {
    const tree = await hre.run('mast:generateScriptTree', taskArgs)
    console.log(tree.getRoot().toString('hex'))
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
}
