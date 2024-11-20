import { writeContract } from '@wagmi/core'
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from 'viem';


export async function pause(bootcampAddress: Address, functionName: "pause"| "unpause"): Promise<Address | Error> {
  try {
    const result = await writeContract(config, {
      abi: DepositHandlerAbi,
      address: bootcampAddress,
      functionName: functionName,
      args: [],
    });

    return result;
  } catch (error) {
    return error as Error;
  }
}
