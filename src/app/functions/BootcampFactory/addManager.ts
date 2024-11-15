import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import { contractFactoryAddress, managerCode } from '@/app/const'
import { Result } from '@/app/types';

export async function addManager(newManagerAddress: `0x${string}`): Promise<Result<`0x${string}`>> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'grantARole',
            args: [
                managerCode,
                newManagerAddress,
            ],
          })
        return { ok: true, value: result };
    } catch (error) {
        console.error(error);
        return { ok: false, error: error as Error };
    }
}

export async function removeManager(managerAddress: `0x${string}`): Promise<Result<`0x${string}`>> {
    try {
        const result : `0x${string}` = await writeContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'revokeARole',
            args: [
                managerCode,
                managerAddress,
            ],
          })
        return { ok: true, value: result };
    } catch (error) {
        console.error(error);
        return { ok: false, error: error as Error };
    }
} 