import { writeContract } from '@wagmi/core'
import { config } from "@/configs/wagmi";
import { Address } from 'viem';
import { ERC20 } from '@/abi/ERC20';


export async function allowAmount(bootcampAddress: Address, amount: bigint, tokenAddress: Address): Promise<Address | Error> {
  try {
    const result = await writeContract(config, {
      abi: ERC20,
      address: tokenAddress,
      functionName: "approve",
      args: [
        bootcampAddress,
        amount
      ],
    });

    return result;
  } catch (error) {
    return error as Error;
  }
}
