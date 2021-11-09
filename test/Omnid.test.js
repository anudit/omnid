const { expect } = require("chai");

describe("Omnid", accounts => {

    let Omnid;
    let owner, alice, bob, addrs;

    beforeEach(async function () {
        [owner, alice, bob, ...addrs] = await ethers.getSigners();

        const OmnidFactory = await ethers.getContractFactory("Omnid");
        Omnid = await OmnidFactory.deploy();
    });


    describe("Score Tests", accounts => {

        it("Should deploy contracts", async function () {
            expect(true).to.equal(true);
        });

        it("Should Mint NFTs", async function () {
            await Omnid.createIdDev(owner.address, 50, "XDXDXDXD");

            let tokenURI = await Omnid.tokenURI(0);
            console.log(tokenURI)
            expect(true).to.equal(true);
        });

    });

});
