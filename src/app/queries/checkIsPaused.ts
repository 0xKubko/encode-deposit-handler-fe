import { readContract } from "wagmi/actions";
import { config } from "@/app/providers";
import { DepositHandlerAbi } from "@/abi/DepositHandler";

export async function checkIsPaused(address: string) {
  try {
    const isPaused = await readContract(config, {
      abi: DepositHandlerAbi,
      address: address as `0x${string}`,
      functionName: "paused",
      args: [],
    });

    return isPaused;
  } catch (error) {
    return error as Error;
  }
}
