import hre from "hardhat";
import { expect } from "chai";

describe("ScriptTree", function () {
  const HashZero = hre.ethers.constants.HashZero;

  it("Should return the conditions root hash once deployed", async () => {
    const ScriptTree = await hre.ethers.getContractFactory("ScriptTree");
    const scriptTree = await ScriptTree.deploy(hre.ethers.constants.HashZero);
    await scriptTree.deployed();

    expect(await scriptTree.conditionsRoot()).to.equal(hre.ethers.constants.HashZero);
  });

  it("Should fail to spend when provided an invalid proof", async () => {
    const ScriptTree = await hre.ethers.getContractFactory("ScriptTree");
    const scriptTree = await ScriptTree.deploy(hre.ethers.constants.HashZero);
    await scriptTree.deployed();

    await expect(
      scriptTree.spend(
        '0x' + '11'.repeat(20),
        20,
        '0x20',
        [
          '0x' + '11'.repeat(32),
          '0x' + '22'.repeat(32)
        ],
        '0x' + '33'.repeat(32),
      )
    ).to.be.revertedWith("Invalid proof.")
  });

  it("Should generate a conditions root from a provided set of contracts", async () => {

  })

  it.skip("Should successfully spend based on a very simple script", async () => {

  })
});
