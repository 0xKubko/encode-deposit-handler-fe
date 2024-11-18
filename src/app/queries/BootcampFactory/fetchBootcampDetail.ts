import { readContract } from "wagmi/actions";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { config } from "@/configs/wagmi";
import { contractFactoryAddress } from "@/app/const";
import { Result } from "@/app/types";

export interface Bootcamp {
  id: bigint;
  depositAmount: bigint;
  depositToken: `0x${string}`;
  bootcampAddress: `0x${string}`;
  // todo: add stuff below
  // start: number; // Assuming start is a number (seconds since epoch)
  // deadline: number; // Assuming deadline is a number (seconds since epoch)
}

export async function fetchBootcampDetail(id: number): Promise<Bootcamp | Error> {
  try {
    const result = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: contractFactoryAddress,
      functionName: "bootcamps",
      args: [BigInt(id)],
    });

    const bootcamp: Bootcamp = {
      id: result[0],
      depositAmount: result[1],
      depositToken: result[2],
      bootcampAddress: result[3],
    };
    return bootcamp;
  } catch (error) {
    return error as Error;
  }
}
