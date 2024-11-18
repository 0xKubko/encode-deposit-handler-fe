import { readContract } from '@wagmi/core'
import { abi as bootcampFactoryAbi } from '@/abi/BootcampFactory.json'
import {config} from '@/configs/wagmi'
import { adminCode, contractFactoryAddress, managerCode } from '@/app/const'
import { Result } from '@/app/types'


export async function checkIsAdmin(address: `0x${string}`): Promise<boolean | Error>{
  try {
    const result = await readContract(config, {
      abi: bootcampFactoryAbi, address: contractFactoryAddress as `0x${string}`,
      functionName: 'hasRole', args: [adminCode, address]
    }) as boolean;
    return result;

  } catch (error) {
    console.error(error);
    return error as Error;
  }
}

export async function checkIsManager(address: `0x${string}`): Promise<boolean | Error>{

  try {
    const result = await readContract(config, {
      abi: bootcampFactoryAbi, address: contractFactoryAddress as `0x${string}`,
      functionName: 'hasRole', args: [managerCode, address]
    }) as boolean;
    
    return result;

  } catch (error) {
    console.error(error);
    return error as Error;
  }
}