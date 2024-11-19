import { readContract } from "wagmi/actions";
import { config } from "@/configs/wagmi";
import { DepositHandlerAbi } from "@/abi/DepositHandler";

export interface Bootcamp {
  name: string;
  depositAmount: bigint;
  depositToken: `0x${string}`;
  bootcampAddress: `0x${string}`;
  bootcampStartTime: Date;
  bootcampDeadline: Date;
  withdrawDuration: number;
}

export async function fetchBootcampDetail(address: `0x${string}`): Promise<Bootcamp | Error> {
  try {
    const name = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "bootcampName",
      args: [],
    });

    const depositAmount = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "depositAmount",
      args: [],
    });

    const depositToken = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "depositToken",
      args: [],
    });

    const bootcampStartTime = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "bootcampStartTime",
      args: [],
    });

    const bootcampDeadline = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "bootcampFinishTime",
      args: [],
    });

    const withdrawDuration = await readContract(config, {
      abi: DepositHandlerAbi,
      address,
      functionName: "withdrawDuration",
      args: [],
    });


    const bootcamp: Bootcamp = {
      name,
      bootcampAddress: address,
      depositAmount,
      depositToken,
      bootcampStartTime: new Date(Number(bootcampStartTime) * 1000),
      bootcampDeadline: new Date(Number(bootcampDeadline) * 1000),
      withdrawDuration: Number(withdrawDuration),
    };


    return bootcamp;
  } catch (error) {
    return error as Error;
  }
}
