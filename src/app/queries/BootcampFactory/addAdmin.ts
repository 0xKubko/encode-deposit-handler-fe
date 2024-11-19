import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import {BootcampFactoryAbi} from '@/abi/BootcampFactory'
import { contractFactoryAddress, adminCode} from '@/app/const'

export async function addAdmin(newAdminAddress: `0x${string}`): Promise<`0x${string}` | Error> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: BootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'grantRole',
            args: [
                adminCode,
                newAdminAddress,
            ],
          })
        return result ;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
}

export async function removeAdmin(adminAddress: `0x${string}`): Promise<`0x${string}`| Error> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: BootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'revokeRole',
            args: [
                adminCode,
                adminAddress,
            ],
          })
        return result;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
} 