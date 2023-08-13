import { BigNumberish, ethers } from "ethers";

export interface Proof {
    signal: string;
    root: BigNumberish;
    nullifierHash: BigNumberish;
    proof: BigNumberish;
  }