import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { contractFactoryAddress } from "@/app/const";
import { config } from "@/configs/wagmi";
import { writeContract } from "wagmi/actions";
import { getDecimals } from "@/app/queries/ERC20/getDecimals";
import { QueryClient } from "@tanstack/react-query";
import { parseUnits } from "viem";


export async function createBootcamp(
  bootcampDepositAmount: number,
  bootcampDepositToken: string,
  bootcampStartTime: number,
  bootcampDeadline: number,
  withdrawDuration: number,
  bootcampName: string,
  queryClient?: QueryClient
): Promise<`0x${string}` | Error> {
  try {

    const decimals = await getDecimals(bootcampDepositToken as `0x${string}`);
    if (decimals instanceof Error) {
      console.error(decimals);
      return decimals;
    }
 
    if (queryClient) {   // We cache the decimals value
      queryClient.setQueryData(['decimals', bootcampDepositToken], decimals);
    }

    const result: `0x${string}` = await writeContract(config,{
      abi: BootcampFactoryAbi,
      address: contractFactoryAddress,
      functionName: "createBootcamp",
      args: [
        parseUnits(bootcampDepositAmount.toString(),decimals),
        bootcampDepositToken as `0x${string}`,
        BigInt(bootcampStartTime), 
        BigInt(bootcampDeadline),
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
