import { readContract } from "wagmi/actions";
import { config } from "@/app/providers";
import { DepositHandlerAbi } from "@/abi/DepositHandler";

export async function checkIsPaused(address: string) {
  try {
    const isPaused = await readContract(config, {
      abi: DepositHandlerAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "paused",
      args: [],
    });

    return isPaused;
  } catch (error) {
    return error as Error;
  }
}
