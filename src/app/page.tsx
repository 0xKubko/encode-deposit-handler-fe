'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { readContract } from '@wagmi/core'
import { abi as bootcampFactoryAbi } from '../abi/BootcampFactory.json'
import { useEffect, useState } from 'react';
import { config } from '../configs/wagmi';
import { stringToHex, keccak256 } from 'viem';

const adminCode = keccak256(stringToHex("ADMIN"));
const managerCode = keccak256(stringToHex("MANAGER"));
// We could also use readContract(config, { abi: bootcampFactoryAbi, address: contractAddress as `0x${string}`, functionName: 'MANAGER' })
// we assume this won't change much

export default function Home() {
  const account = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_FACTORY_ADDRESS;
  if (contractAddress === undefined) {
    throw new Error('Contract address missing in .env');
  }

  useEffect(() => {
    if (account.address) {      
        readContract(config, {
          abi: bootcampFactoryAbi, address: contractAddress as `0x${string}`,
          functionName: 'hasRole', args: [adminCode, account.address]
        }).then(result => { setIsAdmin(result as boolean) });
        readContract(config, {
          abi: bootcampFactoryAbi, address: contractAddress as `0x${string}`,
          functionName: 'hasRole', args: [managerCode, account.address]
        }).then(result => { setIsManager(result as boolean) });
    }

    return () => {
      setIsAdmin(false);
      setIsManager(false);
    }

  }, [contractAddress, account]);


  return (
    <>
      <ConnectButton />
      {account.address && <p>{account.address}</p>}
      {isAdmin && <p>Admin</p>}
      {isManager && <p>Manager</p>}
    </>
  );
}
