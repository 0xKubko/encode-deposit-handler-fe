
import { writeContract } from '@wagmi/core'
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from 'viem';
import { Status } from './DepositTypes';


export async function updateStatusBatch(bootcampAddress: Address, clearedUsers: Address[], status: Status): Promise<Address | Error> {
  try {
    const result = writeContract(config,{
        abi: DepositHandlerAbi,
        address: bootcampAddress,
        functionName: "updateStatusBatch",
        args: [clearedUsers, status], // 2 is the status for cleared = Status.Passed
      });

    return result;
  } catch (error) {
    return error as Error;
  }
}


