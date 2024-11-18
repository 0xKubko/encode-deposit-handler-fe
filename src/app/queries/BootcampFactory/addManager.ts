import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import {BootcampFactoryAbi} from '@/abi/BootcampFactory'
import { contractFactoryAddress, managerCode } from '@/app/const'

export async function addManager(newManagerAddress: `0x${string}`): Promise<`0x${string}` | Error> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: BootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'grantARole',
            args: [
                managerCode,
                newManagerAddress,
            ],
          })
        return result;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
}

export async function removeManager(managerAddress: `0x${string}`): Promise<`0x${string}` | Error> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: BootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'revokeARole',
            args: [
                managerCode,
                managerAddress,
            ],
          })
        return result;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
} 