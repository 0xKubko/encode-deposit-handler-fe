'use client';

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIsAdmin } from './hooks/useIsAdmin';
import { useIsManager } from './hooks/useIsManager';
import { BootcampList } from '@/components/BootcampList';
import Link from 'next/link';

export default function Home() {
  const account = useAccount();
  const {isAdmin} = useIsAdmin();
  const {isManager} = useIsManager();

  if (account.isConnected || isAdmin || isManager) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Encode Bootcamp Deposits</h1>
        <ConnectButton />
        <div className='flex flex-row gap-6'>
        {isAdmin && (
          <Link href="/admin">
            <div className="flex p-4 bg-rose-500 text-white rounded-md">
              Admin Page
            </div>
          </Link>
        )}
        {isManager && (
          <Link href="/manager">
            <div className="flex p-4 bg-rose-500 text-white rounded-md">
              Manager Page
            </div>
          </Link>
        )}
        </div>
        <BootcampList />
      </div>
    );
  }
  else {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Encode Bootcamp Deposits</h1>
        <ConnectButton />
      </div>
    );
  }
}
