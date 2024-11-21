import { stringToHex, keccak256 } from 'viem';
import { checkAddress } from './utils/checkAddress';

export const adminCode = keccak256(stringToHex("ADMIN"));
export const managerCode = keccak256(stringToHex("MANAGER"));
// We could also use readContract(config, { abi: bootcampFactoryAbi, address: contractAddress as `0x${string}`, functionName: 'MANAGER' })
// we assume this won't change much

const _contractFactoryAddress = process.env.NEXT_PUBLIC_CONTRACT_FACTORY_ADDRESS;
if (_contractFactoryAddress === undefined) {
  throw new Error('Contract Factory address missing in .env');
} 
if (!checkAddress(_contractFactoryAddress)){
  throw new Error('Contract Factory address in wrong format');
}
export const contractFactoryAddress = _contractFactoryAddress as `0x${string}`;


export const blockExplorer = process.env.NEXT_PUBLIC_ENABLE_AMOY_TESTNET ? 'https://amoy.polygonscan.com/' : 'https://polygonscan.com/'