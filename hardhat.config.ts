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



/**
 * generateScriptTree
 */
subtask(
  'mast:getArtifacts',
  'Given a list of contract paths, get the artifacts paths '
)
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre) => {
    return taskArgs.scripts.map((scriptPath: string) => {
      const artifactName = path.basename(scriptPath, '.sol') + '.json'
      return path.join(__dirname, 'artifacts', scriptPath, artifactName)
    })
  })

/**
 * generateScriptTree
 */
task('mast:generateScriptTree', 'Generate and print the merkle tree of scripts')
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre): Promise<MerkleTree> => {
    const artifactsPaths = await hre.run('mast:getArtifacts', {
      scripts: taskArgs.scripts,
    })

    const codes = artifactsPaths.map(
      (path: string) => JSON.parse(fs.readFileSync(path, 'utf-8')).bytecode
    )
    const leaves = codes.map((code: string) => SHA256(code))
    const tree = new MerkleTree(leaves, SHA256)

    return tree
  })


/*
 * getScriptRoot
 */
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
