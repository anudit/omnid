const { expect } = require("chai");

describe("Omnid", () => {

    let omnid;
    let nftDescriptor, nftDescriptorV2;
    let owner, addr1, addr2, addrs;

    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const NftDescriptorV2 = await ethers.getContractFactory("NftDescriptorV2");
        nftDescriptorV2 = await NftDescriptorV2.deploy();

        await nftDescriptorV2.addSkin("<defs><linearGradient id='linear-gradient' x1='39.34' y1='184.06' x2='214.68' y2='184.06' gradientTransform='translate(150.97 218.8) rotate(180) scale(0.19)' gradientUnits='userSpaceOnUse'><stop offset='0.17' stop-color='var(--color1)'/><stop offset='0.51' stop-color='var(--color2)'/><stop offset='0.8' stop-color='var(--color3)'/></linearGradient><linearGradient id='linear-gradient-2' x1='39.33' y1='184.06' x2='214.69' y2='184.06' gradientTransform='translate(89.26 210.11) rotate(-90) scale(0.21)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-3' x1='39.32' y1='184.06' x2='214.7' y2='184.06' gradientTransform='translate(85.97 212.38) rotate(-90) scale(0.22)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-4' x1='39.31' y1='184.06' x2='214.71' y2='184.06' gradientTransform='translate(82.41 214.84) rotate(-90) scale(0.24)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-5' x1='39.3' y1='184.06' x2='214.72' y2='184.06' gradientTransform='translate(78.53 217.52) rotate(-90) scale(0.26)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-6' x1='39.29' y1='184.06' x2='214.73' y2='184.06' gradientTransform='translate(74.31 220.43) rotate(-90) scale(0.29)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-7' x1='39.27' y1='184.06' x2='214.74' y2='184.06' gradientTransform='translate(69.73 223.59) rotate(-90) scale(0.31)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-8' x1='39.26' y1='184.06' x2='214.76' y2='184.06' gradientTransform='translate(64.75 227.02) rotate(-90) scale(0.34)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-9' x1='39.25' y1='184.06' x2='214.77' y2='184.06' gradientTransform='translate(59.33 230.76) rotate(-90) scale(0.37)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-10' x1='39.23' y1='184.06' x2='214.79' y2='184.06' gradientTransform='translate(53.45 234.82) rotate(-90) scale(0.4)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-11' x1='39.21' y1='184.06' x2='214.81' y2='184.06' gradientTransform='translate(47.05 239.23) rotate(-90) scale(0.43)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-12' x1='39.19' y1='184.06' x2='214.82' y2='184.06' gradientTransform='translate(67.04 97.16) scale(0.47)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-13' x1='39.17' y1='184.06' x2='214.85' y2='184.06' gradientTransform='translate(61.83 89.6) scale(0.51)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-14' x1='39.15' y1='184.06' x2='214.87' y2='184.06' gradientTransform='translate(56.16 81.38) scale(0.56)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-15' x1='39.12' y1='184.06' x2='214.89' y2='184.06' gradientTransform='translate(50 72.46) scale(0.61)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-16' x1='39.1' y1='184.06' x2='214.92' y2='184.06' gradientTransform='translate(43.3 62.75) scale(0.66)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-17' x1='39.07' y1='184.06' x2='214.95' y2='184.06' gradientTransform='translate(36.02 52.2) scale(0.72)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-18' x1='39.04' y1='184.06' x2='214.98' y2='184.06' gradientTransform='translate(28.11 40.74) scale(0.78)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-19' x1='39' y1='184.06' x2='215.02' y2='184.06' gradientTransform='translate(19.51 28.27) scale(0.85)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-20' x1='38.96' y1='184.06' x2='215.05' y2='184.06' gradientTransform='translate(10.16 14.73) scale(0.92)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-21' x1='38.92' y1='184.06' x2='215.09' y2='184.06' gradientTransform='matrix(1, 0, 0, 1, 0, 0)' xlink:href='#linear-gradient'/><linearGradient id='linear-gradient-22' x1='240.83' y1='208.86' x2='266.9' y2='244.99' gradientTransform='translate(-16.03 291.6) rotate(-90)' gradientUnits='userSpaceOnUse'><stop offset='0.16' stop-color='#fff'/><stop offset='0.93' stop-color='#818181'/></linearGradient></defs><path id='background' d='M10,0H240a10,10,0,0,1,10,10V340a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z' style='fill:#0b0b0b'/><rect x='110.48' y='167.54' width='33.05' height='33.05' style='fill:none;stroke-width:calc(0.19312222569102017px*var(--num1));stroke:url(#linear-gradient)'/><rect x='109.05' y='166.1' width='35.92' height='35.92' transform='translate(-74.66 280.71) rotate(-81)' style='fill:none;stroke-width:calc(0.20991546270763062px*var(--num2));stroke:url(#linear-gradient-2)'/><rect x='107.48' y='164.54' width='39.05' height='39.05' transform='translate(-87.29 247.98) rotate(-72)' style='fill:none;stroke-width:calc(0.22816898120394632px*var(--num3));stroke:url(#linear-gradient-3)'/><rect x='105.79' y='162.84' width='42.44' height='42.44' transform='translate(-94.65 213.67) rotate(-63)' style='fill:none;stroke-width:calc(0.24800976217820253px*var(--num4));stroke:url(#linear-gradient-4)'/><rect x='103.94' y='161' width='46.13' height='46.13' transform='translate(-96.56 178.63) rotate(-54)' style='fill:none;stroke-width:calc(0.26957582845456796px*var(--num5));stroke:url(#linear-gradient-5)'/><rect x='101.94' y='158.99' width='50.14' height='50.14' transform='translate(-92.95 143.72) rotate(-45)' style='fill:none;stroke-width:calc(0.2930172048419217px*var(--num1));stroke:url(#linear-gradient-6)'/><rect x='99.76' y='156.81' width='54.51' height='54.51' transform='matrix(0.81, -0.59, 0.59, 0.81, -83.93, 109.81)' style='fill:none;stroke-width:calc(0.31849696178469744px*var(--num2));stroke:url(#linear-gradient-7)'/><rect x='97.39' y='154.44' width='59.24' height='59.24' transform='translate(-69.72 77.72) rotate(-27)' style='fill:none;stroke-width:calc(0.34619234976597546px*var(--num3));stroke:url(#linear-gradient-8)'/><rect x='94.81' y='151.87' width='64.4' height='64.4' transform='translate(-50.66 48.26) rotate(-18)' style='fill:none;stroke-width:calc(0.37629603235432113px*var(--num4));stroke:url(#linear-gradient-9)'/><rect x='92.01' y='149.07' width='70' height='70' transform='translate(-27.23 22.13) rotate(-9)' style='fill:none;stroke-width:calc(0.40901742647208816px*var(--num5));stroke:url(#linear-gradient-10)'/><rect x='88.97' y='146.02' width='76.08' height='76.08' style='fill:none;stroke-width:calc(0.44458415920879146px*var(--num1));stroke:url(#linear-gradient-11)'/><rect x='85.66' y='142.71' width='82.7' height='82.7' transform='translate(-74.66 280.71) rotate(-81)' style='fill:none;stroke-width:calc(0.48324365131390373px*var(--num2));stroke:url(#linear-gradient-12)'/><rect x='82.06' y='139.12' width='89.89' height='89.89' transform='translate(-87.29 247.98) rotate(-72)' style='fill:none;stroke-width:calc(0.525264838384678px*var(--num3));stroke:url(#linear-gradient-13)'/><rect x='78.16' y='135.21' width='97.71' height='97.71' transform='translate(-94.65 213.67) rotate(-63)' style='fill:none;stroke-width:calc(0.570940041722476px*var(--num4));stroke:url(#linear-gradient-14)'/><rect x='73.91' y='130.96' width='106.2' height='106.2' transform='translate(-96.56 178.63) rotate(-54)' style='fill:none;stroke-width:calc(0.6205870018722566px*var(--num5));stroke:url(#linear-gradient-15)'/><rect x='69.29' y='126.35' width='115.44' height='115.44' transform='translate(-92.95 143.72) rotate(-45)' style='fill:none;stroke-width:calc(0.6745510889915832px*var(--num1));stroke:url(#linear-gradient-16)'/><rect x='64.27' y='121.33' width='125.48' height='125.48' transform='translate(-83.93 109.81) rotate(-36)' style='fill:none;stroke-width:calc(0.733207705425634px*var(--num2));stroke:url(#linear-gradient-17)'/><rect x='58.82' y='115.87' width='136.39' height='136.39' transform='translate(-69.72 77.72) rotate(-27)' style='fill:none;stroke-width:calc(0.796964897201776px*var(--num3));stroke:url(#linear-gradient-18)'/><rect x='52.89' y='109.94' width='148.25' height='148.25' transform='translate(-50.66 48.26) rotate(-18)' style='fill:none;stroke-width:calc(0.8662661926106261px*var(--num4));stroke:url(#linear-gradient-19)'/><rect x='46.44' y='103.5' width='161.14' height='161.14' transform='translate(-27.23 22.13) rotate(-9)' style='fill:none;stroke-width:calc(0.9415936876202458px*var(--num5));stroke:url(#linear-gradient-20)'/><rect x='39.43' y='96.49' width='175.15' height='175.15' style='fill:none;stroke-width:calc(1.0234713995872236px*var(--num1));stroke:url(#linear-gradient-21)'/>");

        await nftDescriptorV2.addSkin(`<g fill='none' strokeLinecap='round'><path id='background' d='M10,0H240a10,10,0,0,1,10,10V340a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z' style='fill:#0b0b0b'/><path d='M498.6 289.2c-6.8 14.3-108.9 79.6-183.6 151.6C203.1 548.7 88.4 301.1 15.2 237.9 0 224.8 84.8 114.3 168.1 73.8c1.9-.9 5-4.8 5.8-2.8 71.2 165.7 226.7-63.1 289-5.3 66.4 61.8-36.5 198.6 35.7 223.5z' stroke='var(--color1)' strokeWidth='1.5' strokeDasharray='9,9,9,9,9,9'/><path d='M168.3 77.8c1.9-.9 4.9-4.7 5.7-2.8 33.1 72.8 83.9 65.9 135.1 41.3 57.7-27.9 116.5-76 149.6-45.5 66.1 60.9-32.2 194.6 34.5 217.5-8.1 13.2-109.1 82-180.8 150C204.8 540.6 87.1 293.5 19.1 238.6 4.6 226.8 87.5 118 168.3 77.8z' stroke='var(--color2)' strokeWidth='calc(1.48*var(--num2))' strokeDasharray='8.94,8.94,8.94,8.94,8.94,8.94'/><path d='M168.5 81.7c1.9-.9 4.7-4.6 5.6-2.9 32.9 68.1 82.7 63.2 133 39.4 56.4-26.7 114.4-72.7 147.5-42.5 65.7 60.1-27.9 190.7 33.3 211.5-9.5 12.1-109.4 84.2-178 148.4C206.3 532.4 85.8 285.9 23.1 239.2c-14-10.3 67.1-117.5 145.4-157.5z' stroke='var(--color3)' strokeWidth='calc(1.47*var(--num3))' strokeDasharray='8.87,8.87,8.87,8.87,8.87,8.87'/><path d='M168.7 85.7c1.8-1 4.6-4.5 5.5-2.9 32.7 63.4 81.5 60.5 130.9 37.5 55.1-25.6 112.3-69.4 145.4-39.5 65.4 59.3-23.6 186.7 32.1 205.4-10.8 11-109.7 86.5-175.3 146.7-99.4 91.4-222.8-154.4-280.3-193C13.7 231 92.9 125.3 168.7 85.7z' stroke='var(--color4)' strokeWidth='calc(1.45*var(--num4))' strokeDasharray='8.81,8.81,8.81,8.81,8.81,8.81'/><path d='M168.9 89.6c1.8-1 4.5-4.5 5.3-2.9 32.5 58.8 80.3 57.7 128.7 35.6 53.7-24.6 110.2-66.1 143.3-36.5 65 58.5-19.3 182.8 30.9 199.4-12.2 9.9-110 88.8-172.5 145.1-95.1 85.9-221.3-159-273.7-189.7-12.6-7.4 64.7-111.6 138-151z' stroke='var(--color5)' strokeWidth='calc(1.44*var(--num5))' strokeDasharray='8.74,8.74,8.74,8.74,8.74,8.74'/><path d='M169.1 93.6c1.7-1 4.3-4.4 5.2-2.9 32.3 54.1 79.1 55 126.6 33.7C353.2 100.9 409 61.6 442.1 91c64.6 57.7-15 178.9 29.7 193.4-13.5 8.8-110.3 91.1-169.7 143.5C211 508 82.3 264.3 34.9 241.3c-12.1-5.9 63.4-108.7 134.2-147.7z' stroke='var(--color1)' strokeWidth='calc(1.42*var(--num1))' strokeDasharray='8.68,8.68,8.68,8.68,8.68,8.68'/><path d='M169.3 97.5c1.7-1 4.2-4.3 5.1-3 32.1 49.6 77.9 52.3 124.5 31.8 50.9-22.4 106-59.6 139.1-30.4 64.4 56.8-10.7 174.9 28.5 187.4-14.9 7.7-110.5 93.4-166.9 141.9-87 74.7-217.9-167.6-260.8-183.3-11.3-4.1 62.2-105.7 130.5-144.4z' stroke='var(--color2)' strokeWidth='1.4' strokeDasharray='8.61,8.61,8.61,8.61,8.61,8.61'/><path d='M169.5 101.5c1.7-1 4.1-4.2 4.9-3 31.9 45 76.7 49.5 122.4 29.9 49.6-21.3 103.9-56.3 137-27.4 64 56-6.4 171 27.3 181.4-16.3 6.6-110.8 95.6-164.2 140.2-82.7 69.1-214.2-179.8-254.2-180-9.8-4.5 61-102.8 126.8-141.1z' stroke='var(--color3)' strokeWidth='calc(1.39*var(--num3))' strokeDasharray='8.55,8.55,8.55,8.55,8.55,8.55'/><path d='M169.7 105.4c1.6-1 3.9-4.1 4.8-3 31.7 40.6 75.5 46.8 120.3 28 48.2-20.2 101.8-53 134.8-24.4 63.7 55.1-2.1 167.1 26.1 175.4-17.6 5.5-111.1 97.9-161.4 138.6-78.6 63.5-212.4-185.6-247.6-176.7-9.1-3.3 59.7-100 123-137.9z' stroke='var(--color4)' strokeWidth='calc(1.37*var(--num4))' strokeDasharray='8.48,8.48,8.48,8.48,8.48,8.48'/><path d='M169.9 109.4c1.6-1 3.8-4.1 4.7-3.1 31.6 36.2 74.2 44 118.1 26.1 46.8-19.1 99.7-49.7 132.7-21.4 63.3 54.3 2.2 163.2 24.9 169.4-19 4.4-111.4 100.2-158.6 137C217.3 475.3 81.1 226.1 50.6 244c-8.3-2.1 58.4-97.1 119.3-134.6z' stroke='var(--color5)' strokeWidth='calc(1.35*var(--num5))' strokeDasharray='8.42,8.42,8.42,8.42,8.42,8.42'/><path d='M170.1 113.3c1.6-1 3.7-4 4.5-3.1 31.6 31.9 73 41.3 116 24.1 45.4-18.1 97.6-46.4 130.6-18.4 63 53.5 6.5 159.2 23.7 163.4-20.3 3.4-111.6 102.4-155.8 135.4-70.3 52.4-208.8-197-234.6-170.1-7.5-.8 57.2-94.2 115.6-131.3z' stroke='var(--color1)' strokeWidth='calc(1.34*var(--num1))' strokeDasharray='8.35,8.35,8.35,8.35,8.35,8.35'/><path d='M170.3 117.3c1.5-1 3.6-3.9 4.4-3.1 31.6 27.7 71.8 38.5 113.9 22.2 44-17 95.5-43.2 128.5-15.4 62.6 52.7 10.8 155.3 22.5 157.4-21.7 2.3-111.9 104.7-153 133.7-66.2 46.8-207.1-202.7-228.1-166.8-6.8.4 55.9-91.4 111.8-128z' stroke='var(--color2)' strokeWidth='calc(1.32*var(--num2))' strokeDasharray='8.29,8.29,8.29,8.29,8.29,8.29'/><path d='M170.5 121.2c1.5-1 3.4-3.8 4.3-3.2 31.8 23.6 70.5 35.8 111.8 20.3C329.2 122.5 380 98.6 413 126c62.2 51.9 15.1 151.4 21.2 151.4-23 1.2-112.2 106.9-150.3 132.1C222 450.6 78.7 201 62.5 246c-6.1 1.6 54.5-88.6 108-124.8z' stroke='var(--color3)' strokeWidth='calc(1.31*var(--num3))' strokeDasharray='8.23,8.23,8.23,8.23,8.23,8.23'/><path d='M170.7 125.2c1.4-1 3.3-3.7 4.2-3.2 32.2 19.5 69.3 33 109.7 18.4 41.2-14.9 91.3-36.6 124.3-9.4 61.9 51.1 19.4 147.4 20 145.4-24.4.1-112.4 109.1-147.5 130.5-57.8 35.3-203.5-214.2-215-160.3-5.3 2.8 53.3-85.7 104.3-121.4z' stroke='var(--color4)' strokeWidth='calc(1.29*var(--num4))' strokeDasharray='8.16,8.16,8.16,8.16,8.16,8.16'/><path d='M170.9 129.1c1.4-1 3.3-3.8 4-3.2 35.1 9 68.1 30.3 107.6 16.5 39.8-13.8 89.2-33.3 122.2-6.4 61.5 50.2 23.7 143.5 18.8 139.4-25.7-1-112.6 111.2-144.7 128.9-53.7 29.5-201.7-220-208.5-157-4.5 4 52-83 100.6-118.2z' stroke='var(--color5)' strokeWidth='calc(1.27*var(--num5))' strokeDasharray='8.1,8.1,8.1,8.1,8.1,8.1'/><path d='M171.1 133.1c1.4-1 3.2-3.7 3.9-3.2 35.2 4.1 66.8 27.5 105.4 14.6 38.4-12.8 87.1-30 120.1-3.3 61.1 49.4 28 139.6 17.6 133.4-27.1-2.1-112.8 113.3-141.9 127.2C226.8 425.4 76.3 176 74.3 248c-3.8 5.2 50.7-80.3 96.8-114.9z' stroke='var(--color1)' strokeWidth='calc(1.26*var(--num1))' strokeDasharray='8.03,8.03,8.03,8.03,8.03,8.03'/><path d='M171.3 137c1.3-1 3.1-3.6 3.8-3.3 35.3-.7 65.6 24.7 103.3 12.7 37-11.8 85-26.7 118-.3 60.8 48.6 32.3 135.6 16.4 127.4-28.4-3.2-113 115.4-139.2 125.6-45.1 17.7-198.1-231.4-195.4-150.4-3 6.4 49.4-77.6 93.1-111.7z' stroke='var(--color2)' strokeWidth='calc(1.24*var(--num2))' strokeDasharray='7.97,7.97,7.97,7.97,7.97,7.97'/><path d='M171.6 141c1.3-1 2.9-3.5 3.6-3.3 35.4-5.6 64.3 21.9 101.2 10.8 35.6-10.7 82.9-23.4 115.8 2.7 60.4 47.8 36.6 131.7 15.2 121.3-29.8-4.3-113 117.4-136.4 124-40.7 11.6-196.3-237.2-188.8-147.2-2.3 7.7 48-74.9 89.4-108.3z' stroke='var(--color3)' strokeWidth='calc(1.23*var(--num3))' strokeDasharray='7.9,7.9,7.9,7.9,7.9,7.9'/><path d='M171.8 144.9c1.3-1.1 2.8-3.5 3.5-3.3 35.6-10.5 63.1 19.2 99.1 8.9 34.1-9.7 80.8-20.1 113.7 5.7 60 47 40.9 127.8 14 115.3-31.1-5.4-112.9 119.3-133.6 122.4C232.3 399.3 87.9 150.2 86.1 250c-.2 9 46.7-72.3 85.7-105.1z' stroke='var(--color4)' strokeWidth='calc(1.21*var(--num4))' strokeDasharray='7.84,7.84,7.84,7.84,7.84,7.84'/><path d='M172 148.9c1.2-1.1 2.7-3.4 3.4-3.4 35.7-15.4 61.8 16.4 97 7 32.7-8.7 78.7-16.8 111.6 8.7 59.7 46.2 45.2 123.9 12.8 109.3C364.3 264 284 395.2 266 391.2c-30.9 5.2-180.9-249.8-176-140.5.5 10.1 45.3-69.7 82-101.8z' stroke='var(--color5)' strokeWidth='calc(1.19*var(--num5))' strokeDasharray='7.77,7.77,7.77,7.77,7.77,7.77'/><path d='M172.2 152.8c1.2-1.1 2.6-3.3 3.3-3.4 35.8-20.3 60.5 13.6 94.8 5.1 31.3-7.7 76.5-13.5 109.5 11.7 59.3 45.4 49.5 119.9 11.6 103.3-33.9-7.6-113.1 127.1-128.1 119.1-26.5-.2-180.7-255.8-169.3-137.2 1.1 11.3 43.9-67.1 78.2-98.6z' stroke='var(--color1)' strokeWidth='calc(1.18*var(--num1))' strokeDasharray='7.71,7.71,7.71,7.71,7.71,7.71'/><path d='M172.4 156.8c1.1-1.1 2.4-3.2 3.1-3.4 35.9-25.2 59.3 10.8 92.7 3.2 29.8-6.8 74.4-10.2 107.4 14.7 58.9 44.6 53.8 116 10.4 97.3C350.8 260 272.7 398 260.7 386.1 238.5 380.4 80.3 124.4 97.9 252c1.7 12.5 42.5-64.5 74.5-95.2z' stroke='var(--color2)' strokeWidth='calc(1.16*var(--num2))' strokeDasharray='7.65,7.65,7.65,7.65,7.65,7.65'/><path d='M172.6 160.7c1.1-1.1 2.4-3.1 3-3.5 40.2-24.4 58 7.9 90.6 1.3 28.4-5.8 72.3-7 105.3 17.7 58.5 43.8 58.1 112.1 9.2 91.3-36.6-9.7-113.5 131.8-122.5 115.9-17.9-11.1-180-267.4-156.3-130.8 2.3 13.8 41-61.9 70.7-91.9z' stroke='var(--color3)' strokeWidth='calc(1.15*var(--num3))' strokeDasharray='7.58,7.58,7.58,7.58,7.58,7.58'/><path d='M172.8 164.7c1-1.1 2.3-3 2.9-3.5 40.2-30.3 56.7 5.1 88.5-.6 26.9-4.8 70.2-3.7 103.2 20.7 58.2 43 62.4 108.1 8 85.3-37.9-10.8-113.7 134.2-119.7 114.2C242 364.3 76.3 107.8 106 253.3c2.8 15 39.4-59.4 66.8-88.6z' stroke='var(--color4)' strokeWidth='calc(1.13*var(--num4))' strokeDasharray='7.52,7.52,7.52,7.52,7.52,7.52'/><path d='M173 168.6c1-1.1 2.1-3 2.7-3.5 40-36.1 55.4 2.2 86.4-2.5 25.5-3.9 68.1-.4 101.1 23.7 57.8 42.2 66.7 104.2 6.8 79.3-39.3-11.9-110.6 135.9-117 112.6-6.3-23-178.7-278.6-143.2-124.2 3.6 16.2 38-57 63.2-85.4z' stroke='var(--color5)' strokeWidth='calc(1.11*var(--num5))' strokeDasharray='7.45,7.45,7.45,7.45,7.45,7.45'/><path d='M173.2 172.6c1-1.1 2-2.9 2.6-3.6 39.7-41.9 54.1-.7 84.2-4.5 24-3 66 2.9 99 26.8 57.4 41.4 71 100.3 5.6 73.3-40.6-13-111.6 138.8-114.2 111C247.7 348 72.5 91.4 113.7 254.7c4.4 17.4 36.5-54.6 59.5-82.1z' stroke='var(--color1)' strokeWidth='1.1' strokeDasharray='7.39,7.39,7.39,7.39,7.39,7.39'/><path d='M173.4 176.5c.9-1.2 1.9-2.9 2.5-3.6 39.3-47.5 52.8-3.6 82.1-6.4 22.5-2.1 63.8 6.2 96.8 29.8 57 40.6 75.3 96.4 4.4 67.3-42-14.1-112.4 141.4-111.4 109.4 1-32.7-176.9-289.8-130.2-117.6 5.1 18.6 35-52.2 55.8-78.9z' stroke='var(--color2)' strokeWidth='calc(1.08*var(--num2))' strokeDasharray='7.32,7.32,7.32,7.32,7.32,7.32'/><path d='M173.6 180.5c.9-1.2 1.8-2.8 2.4-3.6 38.9-53 51.5-6.6 80-8.3 21.1-1.3 61.7 9.6 94.7 32.8 56.6 40 79.6 92.4 3.2 61.3-43.3-15.2-113.2 143.9-108.6 107.7 4.7-37.9-176-295.3-123.8-114.3 5.8 19.8 33.4-49.8 52.1-75.6z' stroke='var(--color3)' strokeWidth='calc(1.06*var(--num3))' strokeDasharray='7.26,7.26,7.26,7.26,7.26,7.26'/><path d='M173.8 184.5c.8-1.2 1.6-2.7 2.2-3.6 38.5-58.4 50.3-7.7 77.9-10.2 19.6-1.7 59.6 12.9 92.6 35.8 56.2 39.2 83.9 88.5 1.9 55.3-44.7-16.3-113.9 146.2-105.9 106.1 8.7-43.4-174.8-300.9-117-111.2 6.4 21.2 31.6-47.3 48.3-72.2z' stroke='var(--color4)' strokeWidth='calc(1.05*var(--num4))' strokeDasharray='7.19,7.19,7.19,7.19,7.19,7.19'/><path d='M174 188.4c.8-1.2 1.5-2.7 2.1-3.7 38-63.7 49-11.3 75.8-12.1 18.2-.6 57.5 16.2 90.5 38.8 55.8 38.4 88.2 84.6.7 49.3-46-17.4-114.4 148.6-103.1 104.5 12.5-48.7-173.8-306.4-110.6-107.8 7.1 22.4 29.9-44.9 44.6-69z' stroke='var(--color5)' strokeWidth='calc(1.03*var(--num5))' strokeDasharray='7.13,7.13,7.13,7.13,7.13,7.13'/><path d='m174.2 192.4 2-3.7c37.6-69 47.7-15.8 73.6-14 16.8 1.2 55.3 19.5 88.4 41.8 55.5 37.5 92.5 80.6-.5 43.3-47.4-18.4-114.9 150.9-100.3 102.9 16.5-54.2-172.7-311.9-104.1-104.5 7.9 23.5 28.2-42.7 40.9-65.8z' stroke='var(--color1)' strokeWidth='calc(1.02*var(--num1))' strokeDasharray='7.06,7.06,7.06,7.06,7.06,7.06'/><path d='M332.4 258.8C283.6 239.2 217 411.9 234.8 360c20.5-59.7-171.5-317.5-97.5-101.3 8.5 24.9 26.3-40.1 37.1-62.4 38.7-79.7 47.9-22.8 73.4-19.6 41 5 242 145.2 84.6 82.1z' stroke='var(--color2)' strokeDasharray='7,7,7,7,7,7'/></g>`);

        const Omnid = await ethers.getContractFactory("Omnid");
        omnid = await Omnid.deploy(nftDescriptorV2.address);
    });


    describe("Score Tests", accounts => {

        it("Should deploy contracts", async function () {
            expect(true).to.equal(true);
        });

        it("Should Mint NFTs", async function () {
            await omnid.createIdDev(owner.address, 50, ethers.utils.formatBytes32String("XDXDXDXD"), 1);

            let tokenURI = await omnid.tokenURI(0);
            let metadata = tokenUriToJson(tokenURI);
            expect(metadata['attributes'][0].value).to.equal(50);
        });

        it("Should add New Skins", async function () {

            let skin = "<defs><pattern id='poly' x='0' y='0' width='0.1' height='0.07'><rect fill='#330073' width='200' height='200'/><path d='M17.4 6.1c-.3-.2-.8-.2-1.2 0l-2.7 1.5-1.8 1L9 10.2c-.3.2-.8.2-1.2 0L5.7 9c-.4-.2-.6-.6-.6-1V5.6c0-.4.2-.8.6-1l2.1-1.2c.3-.2.8-.2 1.2 0l2.1 1.2c.3.2.6.6.6 1v1.5l1.8-1V4.6c0-.4-.2-.8-.6-1L9 1.4c-.3-.2-.8-.2-1.2 0l-4 2.2c-.4.2-.6.6-.6 1V9c0 .4.2.8.6 1l4 2.2c.3.2.8.2 1.2 0l2.7-1.5 1.8-1 2.7-1.5c.4-.2.8-.2 1.2 0l2.1 1.2c.3.2.6.6.6 1v2.4c0 .4-.2.8-.6 1L17.4 15c-.3.2-.8.2-1.2 0l-2.1-1.2c-.3-.2-.6-.6-.6-1v-1.5l-1.8 1v1.5c0 .4.2.8.6 1l4 2.2c.3.2.8.2 1.2 0l4-2.2c.3-.2.6-.6.6-1V9.3c0-.4-.2-.8-.6-1l-4.1-2.2z' fill='#8247e5'/></pattern></defs><rect fill='url(#poly)' width='250' height='360' patternUnits='userSpaceOnUse'/>";
            await nftDescriptorV2.addSkin(skin);

            let skinCount = await nftDescriptorV2.skinCounter();

            expect(skinCount).to.equal(3);

        });


        it("Should get Random Card design", async function () {


            let data = await nftDescriptorV2.constructTokenURI(0, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", [1000, 1638013711, 0, ethers.utils.formatBytes32String('Ayoooo')]);
            expect(true).to.equal(true);

        });
    });

});

function tokenUriToJson(tokenURI){
    return JSON.parse(Buffer.from(tokenURI.split(',')[1], 'base64').toString('utf8'));
}
