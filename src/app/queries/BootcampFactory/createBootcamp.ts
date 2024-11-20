import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { contractFactoryAddress } from "@/app/const";
import { config } from "@/configs/wagmi";
import { writeContract } from "wagmi/actions";
import { getDecimals } from "../ERC20/getDecimals";
import { QueryClient } from "@tanstack/react-query";


export async function createBootcamp(
  bootcampDepositAmount: number,
  bootcampDepositToken: string,
  bootcampStartTime: number,
  withdrawDuration: number,
  bootcampDeadline: number,
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
        BigInt(bootcampDepositAmount* 10**decimals),
        bootcampDepositToken as `0x${string}`, // 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359 for polygon usdc
        BigInt(bootcampStartTime), 
        BigInt(withdrawDuration), 
        BigInt(bootcampDeadline),
        bootcampName,
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
}
