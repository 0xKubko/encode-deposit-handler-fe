import { ERC20 } from "@/abi/ERC20";
import { config } from "@/configs/wagmi";
import { writeContract } from '@wagmi/core'
import { Address } from "viem";



export async function mint(address:Address, amount:bigint) {
    await writeContract(config,{
        abi: [{
            type: "function",
            name: "mint",
            inputs: [
              { name: "to", type: "address", internalType: "address" },
              { name: "amount", type: "uint256", internalType: "uint256" }
            ],
            outputs: [],
            stateMutability: "nonpayable"
          }],
        address: "0xEA5b824cF5BB0e6e05dF6cF1d48cBaBbAd32b206",
        functionName: "mint",
        args: [
            address,
            amount
        ],
    });
}