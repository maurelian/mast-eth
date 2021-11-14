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
import {generateScriptTree, getArtifacts} from './utils'

/**
 * generateScriptTree
 */
subtask(
  'mast:getArtifacts',
  'Given a list of contract paths, get the artifacts paths '
)
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre) => {
    return getArtifacts(taskArgs.scripts)
  })

/**
 * generateScriptTree
 */
task('mast:generateScriptTree', 'Generate and print the merkle tree of scripts')
  .addVariadicPositionalParam('scripts', 'paths to scripts')
  .setAction(async (taskArgs, hre): Promise<MerkleTree> => {
    return generateScriptTree(taskArgs.scripts)
  })

  /**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
}
