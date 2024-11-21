import { readContract } from "wagmi/actions";
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";
import { Address } from "viem";
import { Deposit } from "./DepositTypes";


export async function checkDeposited(address: Address, bootcampAddress:Address) : Promise< Deposit | null | Error> {
  try {
    const [depositedAmount, depositDonation, status] = await readContract(config, {
      abi: DepositHandlerAbi,
      address: bootcampAddress,
      functionName: "deposits",
      args: [
        address
      ],
    });

    return {
        depositedAmount,
        depositDonation,
        status
      };
    
  } catch (error) {
    return error as Error;
  }
}
