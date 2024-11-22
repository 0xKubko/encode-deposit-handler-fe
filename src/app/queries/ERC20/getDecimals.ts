import { config } from "@/configs/wagmi";
import { Address } from 'viem';
import { ERC20Metadata } from '@/abi/ERC20Metadata';
import { readContract } from 'wagmi/actions';


export async function getDecimals(tokenAddress: Address): Promise<number | Error> {
  try {
    const result = await readContract(config, {
      abi: ERC20Metadata,
      address: tokenAddress,
      functionName: "decimals",
      args: [],
    });

    return result;
  } catch (error) {
    return error as Error;
  }
}
