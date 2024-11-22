import { config } from "@/configs/wagmi";
import { Address } from 'viem';
import { ERC20Metadata } from '@/abi/ERC20Metadata';
import { readContract } from 'wagmi/actions';


export async function getAllowance(bootcampAddress: Address, userAddress: Address, tokenAddress: Address): Promise<bigint | Error> {
  try {
    const result = await readContract(config, {
      abi: ERC20Metadata,
      address: tokenAddress,
      functionName: "allowance",
      args: [
        userAddress,
        bootcampAddress
      ],
    });

    return result;
  } catch (error) {
    return error as Error;
  }
}
