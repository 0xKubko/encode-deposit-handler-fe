import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { contractFactoryAddress } from "@/app/const";
import { config } from "@/configs/wagmi";
import { writeContract } from "@wagmi/core";


export async function createBootcamp(
  bootcampDepositAmount: number,
  bootcampDepositToken: string,
  bootcampStartTime: number,
  withdrawDuration: number,
  bootcampName: string
): Promise<`0x${string}` | Error> {
  try {
    const result: `0x${string}` = await writeContract(config,{
      abi: BootcampFactoryAbi,
      address: contractFactoryAddress,
      functionName: "createBootcamp",
      args: [
        BigInt(bootcampDepositAmount),
        bootcampDepositToken as `0x${string}`, // 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359 for polygon usdc
        BigInt(bootcampStartTime), 
        BigInt(withdrawDuration), 
        bootcampName,
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
}
