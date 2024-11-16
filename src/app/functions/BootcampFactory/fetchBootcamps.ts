import { readContract } from '@wagmi/core'
import { config } from '@/configs/wagmi'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import { contractFactoryAddress} from '@/app/const'
import { Result } from '@/app/types';

export interface Bootcamp{
    id : bigint,
    depositAmount : bigint,
    depositToken : `0x${string}`,
    bootcampAddress : `0x${string}`
}

export async function fetchBootcamps(): Promise<Result<Bootcamp[]>> {
    try {
        const number = await readContract(config, {
            abi: bootcampFactoryAbi,
            address: contractFactoryAddress,
            functionName: 'totalBootcampAmount',
            args: [],
          }) as bigint;
        
        const bootcamps: Bootcamp[] = [];
        // We have to iterate here
        for (let i = 0; i < number; i++) {
            const result = await readContract(config, {
                abi: bootcampFactoryAbi,
                address: contractFactoryAddress,
                functionName: 'bootcamps',
                args: [i],
              }) as [bigint, bigint, `0x${string}`, `0x${string}`];
              bootcamps.push({ id: result[0], depositAmount: result[1], depositToken: result[2], bootcampAddress: result[3] });
        }        
        return { ok: true, value: bootcamps };
    } catch (error) {
        console.error(error);
        return { ok: false, error: error as Error };
    }
}
