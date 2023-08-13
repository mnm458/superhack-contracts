import * as hre from "hardhat";
import "dotenv/config";
import { IDKitWidget, solidityEncode } from "@worldcoin/idkit";
import { Proof } from "../types/interfaces";


// const { config } = usePrepareContractWrite({
//   address: process.env.SUPERHACK_RESOLVER as `0x${string}`,
//   abi: ResolverABI,
//   enabled: proof != null && address != null,
//   functionName: 'onAttest',
//   args: [
//     address!,
//     proof?.merkle_root ? decode<BigNumber>('uint256', proof?.merkle_root ?? '') : BigNumber.from(0),
//     proof?.nullifier_hash ? decode<BigNumber>('uint256', proof?.nullifier_hash ?? '') : BigNumber.from(0),
//     proof?.proof
//       ? decode<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
//           'uint256[8]',
//           proof?.proof ?? ''
//         )
//       : [
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//           BigNumber.from(0),
//         ],
//   ],
// })


async function main() {

const resolverFactory = await hre.ethers.getContractFactory("CustResolver");
const resolver = await resolverFactory.deploy("0x4200000000000000000000000000000000000021","0x4200000000000000000000000000000000000020", "0x515f06B36E6D3b707eAecBdeD18d8B384944c87f", "app_staging_e21cd92348d6ce379c0eb3da04148646", "superhack"  );
await resolver.waitForDeployment();
console.log("Resolver deployed to:", resolver.target);


// await resolver.verifyAndExecute(
// "0x87d5E3276420f1e261b3971b071BdfC65a87AD0d", 0n,0n, [0n,0n,0n,0n,0n,0n,0n,0n]
// )

// const attestFactory = await hre.ethers.getContractFactory("Attester");
// const attester = await attestFactory.deploy("0x4200000000000000000000000000000000000021")
// await attester.waitForDeployment();
// console.log("Attester deployed to:", attester.target);






}


// async function verifyID(verificationQuery: any) {
//   const proof = verificationQuery.proof;
//   const nullifier_hash = verificationQuery.nullifier_hash;
//   const merkle_root = verificationQuery.merkle_root;

//   const options = {
//     method: `POST`,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       action_id: "wid_staging_8d03e4abe36eb721fdb8eaea4f8589b5",
//       signal: "loginUser",
//       proof: proof,
//       nullifier_hash: nullifier_hash,
//       merkle_root: merkle_root,
//     }),
//   };

//   const verify = await fetch(
//     `https://developer.worldcoin.org/api/v1/verify`,
//     options
//   )
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("Api is not available verifyID");
//     })
//     .catch((error) => {
//       console.error("Error fetching data: ", error);
//     });
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});