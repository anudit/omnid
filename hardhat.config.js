require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
// require('hardhat-contract-sizer');
// require("hardhat-gas-reporter");
require('dotenv').config()

let mnemonic = process.env.MNEMONIC;

const infuraNetwork = (network, chainId, gas) => {
  return {
    url: `https://${network}.infura.io/v3/${process.env.PROJECT_ID}`,
    chainId,
    gas,
    accounts: mnemonic ? { mnemonic } : undefined
  };
};

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            runs: 99999,
            enabled: true
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    rinkeby: infuraNetwork("rinkeby", 4, 6283185),
    kovan: infuraNetwork("kovan", 42, 6283185),
    goerli: infuraNetwork("goerli", 5, 6283185),
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/qqQIm10pMOOsdmlV3p7NYIPt91bB0TL4`,
      chainId: 80001,
      gas: 20000000, // 20M
      accounts: mnemonic ? { mnemonic } : undefined
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 1,
    coinmarketcap: process.env.CMC_APIKEY
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    only: ['Omnid'],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};

