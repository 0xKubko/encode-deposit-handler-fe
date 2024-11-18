import { readContract } from "wagmi/actions";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { contractFactoryAddress } from "@/app/const";
import { config } from "@/configs/wagmi";

export interface Bootcamp {
  id: bigint;
  depositAmount: bigint;
  depositToken: `0x${string}`;
  bootcampAddress: `0x${string}`;
  // todo: add stuff below
  // start: number; // Assuming start is a number (seconds since epoch)
  // deadline: number; // Assuming deadline is a number (seconds since epoch)
}

export async function fetchBootcampDetails() :Promise<Bootcamp[] | Error>  {
  try {
    const length = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: contractFactoryAddress,
      functionName: "totalBootcampAmount",
      args: [],
    });

    const bootcamps: Bootcamp[] = [];
    for (let i = 0; i < length; i++) {
      const result = (await readContract(config, {
        abi: BootcampFactoryAbi,
        address: contractFactoryAddress,
        functionName: "bootcamps",
        args: [BigInt(i + 1)],
      })) as [bigint, bigint, `0x${string}`, `0x${string}`];
      bootcamps.push({
        id: result[0],
        depositAmount: result[1],
        depositToken: result[2],
        bootcampAddress: result[3],
      });
    }
    return bootcamps;
  } catch (error) {
    return error as Error;
  }
}
