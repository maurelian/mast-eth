import hre from 'hardhat'
import { expect } from 'chai'

describe('Tasks', function () {
  it.skip('Should generate a root value given a couple scripts', async () => {
    // we have to define these paths relative to the root dir.
    const tree = await hre.run('mast:generateScriptTree', {
      scripts: [
        './contracts/conditions/ExampleScript1.sol',
        './contracts/conditions/ExampleScript1.sol',
      ],
    })
    // This is just checking against a number the scripts generated,
    // good enough for now.
    expect(tree.getRoot().toString('hex')).to.be.deep.equal('')
  })
})
