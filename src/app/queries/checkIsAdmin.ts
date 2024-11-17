import { readContract } from "wagmi/actions";
import { BootcampFactoryAbi } from "@/abi/BootcampFactory";
import { config } from "@/app/providers";

export async function checkIsAdmin(address: string) {
  try {
    const adminRole = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "ADMIN",
      args: [],
    });

    const isAdmin = await readContract(config, {
      abi: BootcampFactoryAbi,
      address: process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS
        ? (process.env.NEXT_PUBLIC_BOOTCAMP_FACTORY_ADDRESS as `0x${string}`)
        : "0x0000000000000000000000000000000000000000",
      functionName: "hasRole",
      args: [adminRole, address as `0x${string}`],
    });

    return isAdmin;
  } catch (error) {
    return error as Error;
  }
}
