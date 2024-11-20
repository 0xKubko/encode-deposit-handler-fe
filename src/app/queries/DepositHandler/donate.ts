import { writeContract } from '@wagmi/core'
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from 'viem';


export async function donate(bootcampAddress: Address): Promise<Address | Error> {
  try {
    const result = await writeContract(config, {
      abi: DepositHandlerAbi,
      address: bootcampAddress,
      functionName: "donate",
      args: [],
    });

    return result;
  } catch (error) {
    return error as Error;
  }
}
