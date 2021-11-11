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
    await nftDescriptor.addSkin("<rect xmlns='http://www.w3.org/2000/svg' width='250' height='340' fill='rgb(0,0,255)'/><style>.st1{fill:none;stroke:#437def;stroke-width:.5;stroke-miterlimit:10}</style><path fill='#0a1f50' d='M0 0h250v360H0z'/><path d='M273.3 248.5c-3.4-13.5-20.8-21.9-45.4-24.3a212.6 212.6 0 0 1-64.1 27.2 209.7 209.7 0 0 1-70.1 6.7c-20.9 14-32.4 29.9-29 43.5 6.2 24.4 57.9 32.3 115.6 17.6 57.5-14.6 99.2-46.3 93-70.7z' class='st1'/><ellipse cx='161.8' cy='243.5' class='st1' rx='107.6' ry='45.6' transform='rotate(-14.3 161.8 243.5)'/><ellipse cx='151.7' cy='207.6' class='st1' rx='107.6' ry='45.6' transform='rotate(-14.3 151.8 207.7)'/><path d='M282 284.9c-3.4-13.5-20.8-21.9-45.4-24.3a212.6 212.6 0 0 1-64.1 27.2 209.7 209.7 0 0 1-70.1 6.7c-20.9 14-32.4 29.9-29 43.5 6.2 24.4 57.9 32.3 115.6 17.6 57.5-14.6 99.2-46.3 93-70.7z' class='st1'/>");
    await nftDescriptor.addSkin("<image xmlns='http://www.w3.org/2000/svg' width='250' height='360' href='data:image/png;base64,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'/>");
    await nftDescriptor.addSkin("<defs><pattern id='poly' x='0' y='0' width='0.1' height='0.07'><rect fill='#330073' width='200' height='200'/><path d='M17.4 6.1c-.3-.2-.8-.2-1.2 0l-2.7 1.5-1.8 1L9 10.2c-.3.2-.8.2-1.2 0L5.7 9c-.4-.2-.6-.6-.6-1V5.6c0-.4.2-.8.6-1l2.1-1.2c.3-.2.8-.2 1.2 0l2.1 1.2c.3.2.6.6.6 1v1.5l1.8-1V4.6c0-.4-.2-.8-.6-1L9 1.4c-.3-.2-.8-.2-1.2 0l-4 2.2c-.4.2-.6.6-.6 1V9c0 .4.2.8.6 1l4 2.2c.3.2.8.2 1.2 0l2.7-1.5 1.8-1 2.7-1.5c.4-.2.8-.2 1.2 0l2.1 1.2c.3.2.6.6.6 1v2.4c0 .4-.2.8-.6 1L17.4 15c-.3.2-.8.2-1.2 0l-2.1-1.2c-.3-.2-.6-.6-.6-1v-1.5l-1.8 1v1.5c0 .4.2.8.6 1l4 2.2c.3.2.8.2 1.2 0l4-2.2c.3-.2.6-.6.6-1V9.3c0-.4-.2-.8-.6-1l-4.1-2.2z' fill='#8247e5'/></pattern></defs><rect fill='url(#poly)' width='250' height='360' patternUnits='userSpaceOnUse'/>");

    const Omnid = await ethers.getContractFactory("Omnid");
    const omnid = await Omnid.deploy(nftDescriptor.address);

    console.log(JSON.stringify({
        [hre.network.config.chainId]: {
            "NftDescriptor": nftDescriptor.address,
            "Omnid": omnid.address,
        }
    }, null, 2));


    await omnid.createIdDev(
        addr1.address,
        111,
        "AYEE",
        0
    );

    await omnid.createIdDev(
        addr2.address,
        222,
        "😈",
        1
    );

    await omnid.createIdDev(
        owner.address,
        50,
        "WAGMI",
        2
    );

}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
