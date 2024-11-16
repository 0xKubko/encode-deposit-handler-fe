import { readContract } from '@wagmi/core'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import {config} from '@/configs/wagmi'
import { adminCode, contractFactoryAddress, managerCode } from '@/app/const'
import { Result } from '@/app/types'


export async function addressIsAdmin(address: `0x${string}`): Promise<Result<boolean>>{
  try {
    const result = await readContract(config, {
      abi: bootcampFactoryAbi, address: contractFactoryAddress as `0x${string}`,
      functionName: 'hasRole', args: [adminCode, address]
    }) as boolean;
    return {ok: true, value: result}

  } catch (error) {
    console.log(error);
    return {ok: false, error: error as Error}
  }
}

export async function addressIsManager(address: `0x${string}`): Promise<Result<boolean>>{

  try {
    const result = await readContract(config, {
      abi: bootcampFactoryAbi, address: contractFactoryAddress as `0x${string}`,
      functionName: 'hasRole', args: [managerCode, address]
    }) as boolean;
    
    return {ok: true, value: result}

  } catch (error) {
    console.log(error);
    return {ok: false, error: error as Error}
  }
}