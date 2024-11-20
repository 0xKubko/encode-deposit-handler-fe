import { readContract } from "wagmi/actions";
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from "viem";
import { Deposit } from "./DepositTypes";


export async function checkDeposited(address: Address, bootcampAddress:Address) : Promise< Deposit | null | Error> {
  try {
    const result = await readContract(config, {
      abi: DepositHandlerAbi,
      address: bootcampAddress,
      functionName: "deposits",
      args: [
        address
      ],
    });

    if (result[0] !== 0n || result[1] !== false || result[2] !== 0) {
        return {
          depositedAmount: result[0],
          depositDonation: result[1],
          status: result[2]
        }
    }

    return null;
  } catch (error) {
    return error as Error;
  }
}
