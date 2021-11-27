const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {

    const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);
    console.log(`Owner [${owner.address}] Balance:`, ethers.utils.formatEther(await owner.getBalance()).toString());
    console.log(`Addr1 [${addr1.address}] Balance:`, ethers.utils.formatEther(await addr1.getBalance()).toString());
    console.log(`Addr2 [${addr2.address}] Balance:`, ethers.utils.formatEther(await addr2.getBalance()).toString());

    const NftDescriptorV2 = await ethers.getContractFactory("NftDescriptorV2");
    const nftDescriptorV2 = await NftDescriptorV2.deploy();

    // Generative Square
    await nftDescriptorV2.addSkin(`<defs><linearGradient id='linear-gradient' x1='39.34' y1='184.06' x2='214.68' y2='184.06' gradientTransform='translate(150.97 218.8) rotate(180) scale(0.19)' gradientUnits='userSpaceOnUse'><stop offset='0.17' stop-color='var(--color1)'/><stop offset='0.51' stop-color='var(--color2)'/><stop offset='0.8' stop-color='var(--color3)'/></linearGradient><linearGradient id='linear-gradient-2' x1='39.33' y1='184.06' x2='214.69' y2='184.06' gradientTransform='translate(89.26 210.11) rotate(-90) scale(0.21)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-3' x1='39.32' y1='184.06' x2='214.7' y2='184.06' gradientTransform='translate(85.97 212.38) rotate(-90) scale(0.22)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-4' x1='39.31' y1='184.06' x2='214.71' y2='184.06' gradientTransform='translate(82.41 214.84) rotate(-90) scale(0.24)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-5' x1='39.3' y1='184.06' x2='214.72' y2='184.06' gradientTransform='translate(78.53 217.52) rotate(-90) scale(0.26)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-6' x1='39.29' y1='184.06' x2='214.73' y2='184.06' gradientTransform='translate(74.31 220.43) rotate(-90) scale(0.29)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-7' x1='39.27' y1='184.06' x2='214.74' y2='184.06' gradientTransform='translate(69.73 223.59) rotate(-90) scale(0.31)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-8' x1='39.26' y1='184.06' x2='214.76' y2='184.06' gradientTransform='translate(64.75 227.02) rotate(-90) scale(0.34)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-9' x1='39.25' y1='184.06' x2='214.77' y2='184.06' gradientTransform='translate(59.33 230.76) rotate(-90) scale(0.37)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-10' x1='39.23' y1='184.06' x2='214.79' y2='184.06' gradientTransform='translate(53.45 234.82) rotate(-90) scale(0.4)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-11' x1='39.21' y1='184.06' x2='214.81' y2='184.06' gradientTransform='translate(47.05 239.23) rotate(-90) scale(0.43)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-12' x1='39.19' y1='184.06' x2='214.82' y2='184.06' gradientTransform='translate(67.04 97.16) scale(0.47)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-13' x1='39.17' y1='184.06' x2='214.85' y2='184.06' gradientTransform='translate(61.83 89.6) scale(0.51)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-14' x1='39.15' y1='184.06' x2='214.87' y2='184.06' gradientTransform='translate(56.16 81.38) scale(0.56)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-15' x1='39.12' y1='184.06' x2='214.89' y2='184.06' gradientTransform='translate(50 72.46) scale(0.61)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-16' x1='39.1' y1='184.06' x2='214.92' y2='184.06' gradientTransform='translate(43.3 62.75) scale(0.66)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-17' x1='39.07' y1='184.06' x2='214.95' y2='184.06' gradientTransform='translate(36.02 52.2) scale(0.72)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-18' x1='39.04' y1='184.06' x2='214.98' y2='184.06' gradientTransform='translate(28.11 40.74) scale(0.78)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-19' x1='39' y1='184.06' x2='215.02' y2='184.06' gradientTransform='translate(19.51 28.27) scale(0.85)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-20' x1='38.96' y1='184.06' x2='215.05' y2='184.06' gradientTransform='translate(10.16 14.73) scale(0.92)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-21' x1='38.92' y1='184.06' x2='215.09' y2='184.06' gradientTransform='matrix(1, 0, 0, 1, 0, 0)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-22' x1='240.83' y1='208.86' x2='266.9' y2='244.99' gradientTransform='translate(-16.03 291.6) rotate(-90)' gradientUnits='userSpaceOnUse'><stop offset='0.16' stop-color='#fff'/><stop offset='0.93' stop-color='#818181'/></linearGradient></defs><path id='background' d='M10,0H240a10,10,0,0,1,10,10V340a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z' style='fill:#0b0b0b'/><rect x='110.48' y='167.54' width='33.05' height='33.05' style='fill:none;stroke-width:calc(0.19312222569102017px*var(--num1));stroke:url(#linear-gradient)'/><rect x='109.05' y='166.1' width='35.92' height='35.92' transform='translate(-74.66 280.71) rotate(-81)' style='fill:none;stroke-width:calc(0.20991546270763062px*var(--num2));stroke:url(#linear-gradient-2)'/><rect x='107.48' y='164.54' width='39.05' height='39.05' transform='translate(-87.29 247.98) rotate(-72)' style='fill:none;stroke-width:calc(0.22816898120394632px*var(--num3));stroke:url(#linear-gradient-3)'/><rect x='105.79' y='162.84' width='42.44' height='42.44' transform='translate(-94.65 213.67) rotate(-63)' style='fill:none;stroke-width:calc(0.24800976217820253px*var(--num4));stroke:url(#linear-gradient-4)'/><rect x='103.94' y='161' width='46.13' height='46.13' transform='translate(-96.56 178.63) rotate(-54)' style='fill:none;stroke-width:calc(0.26957582845456796px*var(--num5));stroke:url(#linear-gradient-5)'/><rect x='101.94' y='158.99' width='50.14' height='50.14' transform='translate(-92.95 143.72) rotate(-45)' style='fill:none;stroke-width:calc(0.2930172048419217px*var(--num1));stroke:url(#linear-gradient-6)'/><rect x='99.76' y='156.81' width='54.51' height='54.51' transform='matrix(0.81, -0.59, 0.59, 0.81, -83.93, 109.81)' style='fill:none;stroke-width:calc(0.31849696178469744px*var(--num2));stroke:url(#linear-gradient-7)'/><rect x='97.39' y='154.44' width='59.24' height='59.24' transform='translate(-69.72 77.72) rotate(-27)' style='fill:none;stroke-width:calc(0.34619234976597546px*var(--num3));stroke:url(#linear-gradient-8)'/><rect x='94.81' y='151.87' width='64.4' height='64.4' transform='translate(-50.66 48.26) rotate(-18)' style='fill:none;stroke-width:calc(0.37629603235432113px*var(--num4));stroke:url(#linear-gradient-9)'/><rect x='92.01' y='149.07' width='70' height='70' transform='translate(-27.23 22.13) rotate(-9)' style='fill:none;stroke-width:calc(0.40901742647208816px*var(--num5));stroke:url(#linear-gradient-10)'/><rect x='88.97' y='146.02' width='76.08' height='76.08' style='fill:none;stroke-width:calc(0.44458415920879146px*var(--num1));stroke:url(#linear-gradient-11)'/><rect x='85.66' y='142.71' width='82.7' height='82.7' transform='translate(-74.66 280.71) rotate(-81)' style='fill:none;stroke-width:calc(0.48324365131390373px*var(--num2));stroke:url(#linear-gradient-12)'/><rect x='82.06' y='139.12' width='89.89' height='89.89' transform='translate(-87.29 247.98) rotate(-72)' style='fill:none;stroke-width:calc(0.525264838384678px*var(--num3));stroke:url(#linear-gradient-13)'/><rect x='78.16' y='135.21' width='97.71' height='97.71' transform='translate(-94.65 213.67) rotate(-63)' style='fill:none;stroke-width:calc(0.570940041722476px*var(--num4));stroke:url(#linear-gradient-14)'/><rect x='73.91' y='130.96' width='106.2' height='106.2' transform='translate(-96.56 178.63) rotate(-54)' style='fill:none;stroke-width:calc(0.6205870018722566px*var(--num5));stroke:url(#linear-gradient-15)'/><rect x='69.29' y='126.35' width='115.44' height='115.44' transform='translate(-92.95 143.72) rotate(-45)' style='fill:none;stroke-width:calc(0.6745510889915832px*var(--num1));stroke:url(#linear-gradient-16)'/><rect x='64.27' y='121.33' width='125.48' height='125.48' transform='translate(-83.93 109.81) rotate(-36)' style='fill:none;stroke-width:calc(0.733207705425634px*var(--num2));stroke:url(#linear-gradient-17)'/><rect x='58.82' y='115.87' width='136.39' height='136.39' transform='translate(-69.72 77.72) rotate(-27)' style='fill:none;stroke-width:calc(0.796964897201776px*var(--num3));stroke:url(#linear-gradient-18)'/><rect x='52.89' y='109.94' width='148.25' height='148.25' transform='translate(-50.66 48.26) rotate(-18)' style='fill:none;stroke-width:calc(0.8662661926106261px*var(--num4));stroke:url(#linear-gradient-19)'/><rect x='46.44' y='103.5' width='161.14' height='161.14' transform='translate(-27.23 22.13) rotate(-9)' style='fill:none;stroke-width:calc(0.9415936876202458px*var(--num5));stroke:url(#linear-gradient-20)'/><rect x='39.43' y='96.49' width='175.15' height='175.15' style='fill:none;stroke-width:calc(1.0234713995872236px*var(--num1));stroke:url(#linear-gradient-21)'/>`);

    const Omnid = await ethers.getContractFactory("Omnid");
    const omnid = await Omnid.deploy(nftDescriptorV2.address);

    console.log(JSON.stringify({
        [hre.network.config.chainId]: {
            "nftDescriptorV2": nftDescriptorV2.address,
            "Omnid": omnid.address,
        }
    }, null, 2));


    await omnid.createIdDev(
        owner.address,
        111,
        ethers.utils.formatBytes32String("AYEE"),
        0
    );

    let tokenURI = tokenUriToJson(await omnid.tokenURI(0));
    console.log(tokenURI['image']);

}

function tokenUriToJson(tokenURI){
    return JSON.parse(Buffer.from(tokenURI.split(',')[1], 'base64').toString('utf8'));
}



main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
