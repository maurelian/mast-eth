import '@nomiclabs/hardhat-waffle'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
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
export const generateScriptTree = (scripts: string[]): MerkleTree => {
  const artifactsPaths = getArtifacts(scripts)

  const codeLeaves = artifactsPaths.map(
    (path: string) => JSON.parse(fs.readFileSync(path, 'utf-8')).bytecode
  )

  const tree = new MerkleTree(codeLeaves, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  })

  return tree
}

export const getCodeFromScriptPath = (script: string) => {
  const artifactPath = getArtifacts([script])[0]
  return JSON.parse(fs.readFileSync(artifactPath, 'utf-8')).bytecode
}

/**
 * getLeafFromScriptName
 * Get the 256-bit hash from the leaf corresponding top a given script
 */
// @question: what format should it be returned in?
export const getLeafFromScriptPath = (script: string) => {
  const code = getCodeFromScriptPath(script)
  return keccak256(code)
}
