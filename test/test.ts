import hre from "hardhat";
import { expect } from "chai";

describe("MAST", function () {
  const HashZero = hre.ethers.constants.HashZero;

  it("Should return the conditions root hash once deployed", async () => {
    const Mast = await hre.ethers.getContractFactory("MAST");
    const mast = await Mast.deploy(hre.ethers.constants.HashZero);
    await mast.deployed();

    expect(await mast.conditionsRoot()).to.equal(hre.ethers.constants.HashZero);
  });

  it("Should fail to spend when provided an invalid proof", async () => {
    const Mast = await hre.ethers.getContractFactory("MAST");
    const mast = await Mast.deploy(hre.ethers.constants.HashZero);
    await mast.deployed();

    expect(
      await mast.spend(
        [
          '0x' + '11'.repeat(32),
          '0x' + '22'.repeat(32)
        ],
        '0x' + '33'.repeat(32)
      )
    ).to.be.revertedWith("Invalid proof.")
  });
});
