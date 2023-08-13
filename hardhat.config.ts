import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();
const { API_URL, PRIVATE_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "opGoerli",
  networks: {
    opGoerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 100000000,
      gasPrice: 100000000
    },
  },
  etherscan: {
    apiKey: {
      optimisticGoerli: 'GX31JWMYTIRZDAGG46YI6515QXAE882BIB'
    }
  }
};

export default config;
