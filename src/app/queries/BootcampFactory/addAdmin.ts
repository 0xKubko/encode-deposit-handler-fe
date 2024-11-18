import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import { contractFactoryAddress, adminCode} from '@/app/const'
import { Result } from '@/app/types';

export async function addAdmin(newAdminAddress: `0x${string}`): Promise<`0x${string}` | Error> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'grantARole',
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
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'revokeARole',
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