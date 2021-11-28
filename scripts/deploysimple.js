const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {

    const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);
    console.log(`Owner [${owner.address}] Balance:`, ethers.utils.formatEther(await owner.getBalance()).toString());
    console.log(`Addr1 [${addr1.address}] Balance:`, ethers.utils.formatEther(await addr1.getBalance()).toString());
    console.log(`Addr2 [${addr2.address}] Balance:`, ethers.utils.formatEther(await addr2.getBalance()).toString());

    const NftDescriptor = await ethers.getContractFactory("NftDescriptor");
    const nftDescriptor = await NftDescriptor.deploy();

    const Omnid = await ethers.getContractFactory("Omnid");
    const omnid = await Omnid.deploy(nftDescriptor.address);

    console.log(JSON.stringify({
        [hre.network.config.chainId]: {
            "NftDescriptor": nftDescriptor.address,
            "Omnid": omnid.address,
        }
    }, null, 2));


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
