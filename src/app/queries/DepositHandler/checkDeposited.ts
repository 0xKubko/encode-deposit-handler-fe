import { readContract } from "wagmi/actions";
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from "viem";


export async function checkDeposited(address: Address, bootcampAddress:Address) {
  try {
    const result = await readContract(config, {
      abi: DepositHandlerAbi,
      address: bootcampAddress,
      functionName: "deposits",
      args: [
        address
      ],
    });

    if (result[0] != 0n) {
        return true;
    }

    return false;
  } catch (error) {
    return error as Error;
  }
}
