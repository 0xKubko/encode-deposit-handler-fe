import { readContract } from "wagmi/actions";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { config } from "@/app/providers";

export async function checkIsManager(address: string) {
  try {
    const managerRole = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "MANAGER",
      args: [],
    });

    const isManager = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "hasRole",
      args: [managerRole, address as `0x${string}`],
    });

    return isManager;
  } catch (error) {
    return error as Error;
  }
}
