import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import { contractFactoryAddress} from '@/app/const'
import { Result } from '@/app/types';


export async function createBootcamp(depositAmount: bigint, depositToken: `0x${string}`, bootcampDuration: bigint , bootcampStartTime: bigint ): Promise<Result<`0x${string}`>> {
    try {
        console.log(depositAmount, depositToken, bootcampDuration, bootcampStartTime);
        
        const result : `0x${string}` = await writeContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'createBootcamp',
            args: [
                depositAmount,
                depositToken,
                bootcampDuration,
                bootcampStartTime
            ],
          })
        return { ok: true, value: result };
    } catch (error) {
        console.error(error);
        return { ok: false, error: error as Error };
    }
}
