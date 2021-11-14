import '@nomiclabs/hardhat-waffle'
import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'
import * as fs from 'fs'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import * as path from 'path'

/**
 * getArtifacts
 * Given a list of contract paths, get the artifacts paths
 */
export const getArtifacts = (paths: string[]): string[] => {
  return paths.map((p: string) => {
    const artifactName = path.basename(p, '.sol') + '.json'
    return path.join('artifacts', p, artifactName)
  })
}

/**
 * generateScriptTree
 * Generate and print the merkle tree of scripts
 */
export const generateScriptTree = async (scripts: string[]): Promise<MerkleTree> => {
  const artifactsPaths = getArtifacts(scripts)

  const codes = artifactsPaths.map(
    (path: string) => JSON.parse(fs.readFileSync(path, 'utf-8')).bytecode
  )
  const leaves = codes.map((code: string) => SHA256(code))
  const tree = new MerkleTree(leaves, SHA256)

  return tree
}
