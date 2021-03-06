const { expect } = require("chai");
const { ethers } = require("hardhat");

const forwardTime = async () => {
  //Forward time by 1 year
  await ethers.provider.send("evm_increaseTime", [366 * 24 * 3600]);
  await ethers.provider.send("evm_mine");
};

describe("GobletMinter", function () {
  let GobletMinter, gobletMinter, goblet;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5, addr6] =
      await ethers.getSigners();
    GobletMinter = await ethers.getContractFactory("GobletMinter");
    gobletMinter = await GobletMinter.deploy();
    GemstoneMinter = await ethers.getContractFactory("GemstoneMinter");
    gemstoneMinter = await GemstoneMinter.deploy();
    goblet = await ethers.getContractFactory("Gemstone");
    await goblet.deploy();
    await gobletMinter.deployed();
    await gemstoneMinter.deployed();
  });

  it("Should console the uri", async function () {
    console.log(await gobletMinter.connect(owner).uri(1));
  });

  it("Should successfully mint a goblet", async function () {
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 0);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 0);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 1);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 1);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 2);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 2);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 3);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 3);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 4);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 4);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 5);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 5);
    await gobletMinter
      .connect(addr1)
      .mintGoblet(addr1.address, gemstoneMinter.address);
  });

  it("Should fail to mint two goblets by the same address (without waiting for next year)", async function () {
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 0);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 0);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 1);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 1);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 2);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 2);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 3);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 3);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 4);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 4);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 5);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 5);
    await gobletMinter
      .connect(addr1)
      .mintGoblet(addr1.address, gemstoneMinter.address);
    await expect(
      gobletMinter
        .connect(addr1)
        .mintGoblet(addr1.address, gemstoneMinter.address)
    ).to.be.revertedWith("InEligibleToMintGoblet");
  });

  it("Should mint goblets by the same address for next 3 year and fail after that (after waiting for the validity period))", async function () {
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 0);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 0);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 1);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 1);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 2);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 2);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 3);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 3);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 4);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 4);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 5);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 5);
    //2022
    await gobletMinter
      .connect(addr1)
      .mintGoblet(addr1.address, gemstoneMinter.address);
    //Forward time by 1 year
    await forwardTime();
    //Mint next one
    //2023
    await gobletMinter
      .connect(addr1)
      .mintGoblet(addr1.address, gemstoneMinter.address);
    //Forward time by 1 year
    await forwardTime();
    //2024
    await gobletMinter
      .connect(addr1)
      .mintGoblet(addr1.address, gemstoneMinter.address);
    //Forward time by 1 year
    await forwardTime();
    //2025
    await expect(
      gobletMinter
        .connect(addr1)
        .mintGoblet(addr1.address, gemstoneMinter.address)
    ).to.be.revertedWith("MintPeriodOver");
  });

  it("Should fail to mint goblets after 3 years", async function () {
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 0);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 0);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 1);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 1);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 2);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 2);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 3);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 3);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 4);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 4);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 5);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 5);
    //Forward by 3 years
    await forwardTime();
    await forwardTime();
    await forwardTime();
    await expect(
      gobletMinter
        .connect(addr1)
        .mintGoblet(addr1.address, gemstoneMinter.address)
    ).to.be.revertedWith("MintPeriodOver()");
  });

  it("Should fail to mint a goblet for an address that does not have 6 gemstones", async function () {
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 0);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 0);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 1);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 1);
    await gemstoneMinter.connect(owner).addAddressToWhitelist(addr1.address, 5);
    await gemstoneMinter.connect(addr1).whitelistMint(addr1.address, 5);
    await expect(
      gobletMinter
        .connect(addr1)
        .mintGoblet(addr1.address, gemstoneMinter.address)
    ).to.be.revertedWith("InEligibleToMintGoblet()");
  });
});
