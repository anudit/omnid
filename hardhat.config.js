require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");
require('dotenv').config()

let mnemonic = process.env.MNEMONIC;

// ignore test files for foundry compatiblity
const {subtask} = require("hardhat/config");
const {TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS} = require("hardhat/builtin-tasks/task-names")

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS)
  .setAction(async (_, __, runSuper) => {
    const paths = await runSuper();

    return paths.filter(p => !p.endsWith(".t.sol"));
  });

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
        version: "0.8.13",
        settings: {
          optimizer: {
            runs: 999999,
            enabled: true
          },
          metadata: {
            // do not include the metadata hash, since this is machine dependent
            // and we want all generated code to be deterministic
            // https://docs.soliditylang.org/en/v0.7.6/metadata.html
            bytecodeHash: 'none',
          },
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    ropsten: infuraNetwork("ropsten", 3, 6283185),
    rinkeby: infuraNetwork("rinkeby", 4, 6283185),
    goerli: infuraNetwork("goerli", 5, 6283185),
    kovan: infuraNetwork("kovan", 42, 6283185),
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/qqQIm10pMOOsdmlV3p7NYIPt91bB0TL4`,
      chainId: 80001,
      gas: 20000000, // 20M
      accounts: mnemonic ? { mnemonic } : undefined
    }
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined,
      ropsten: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined,
      rinkeby: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined,
      goerli: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined,
      kovan: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined,
      polygon: process.env.POLYGONSCAN_API_KEY ? process.env.POLYGONSCAN_API_KEY : undefined,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY ? process.env.POLYGONSCAN_API_KEY : undefined,
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 1, // xD
    coinmarketcap: process.env.CMC_APIKEY
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  paths: { cache: 'hh-cache' }
};

