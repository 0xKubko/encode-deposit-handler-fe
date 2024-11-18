import { writeContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import { contractFactoryAddress} from '@/app/const'
import { Result } from '@/app/types';


export async function createBootcamp(depositAmount: bigint, depositToken: `0x${string}`, bootcampStartTime: bigint ): Promise<`0x${string}` | Error> {
    try {
        console.log(depositAmount, depositToken, bootcampStartTime);
        
        const result : `0x${string}` = await writeContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'createBootcamp',
            args: [
                depositAmount,
                depositToken,
                bootcampStartTime
            ],
          })
        return result;
    } catch (error) {
        console.error(error);
        return error as Error;
    }
}
