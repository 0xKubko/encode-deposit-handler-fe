'use client';

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from './hooks/useIsAdmin';
import { useIsManager } from './hooks/useIsManager';
import { BootcampList } from '@/components/BootcampList';

export default function Home() {
  const account = useAccount();
  const {isAdmin} = useIsAdmin();
  const {isManager} = useIsManager();
  const router = useRouter();

  if (account.isConnected || isAdmin || isManager) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Encode Bootcamp Deposits</h1>
        <ConnectButton />
        <div className='flex flex-row gap-6'>
        {isAdmin && <button className="btn btn-primary" onClick={() => router.push('/admin')}>Admin</button>}
        {isManager && <button className="btn btn-active btn-secondary" onClick={() => router.push('/manager')}>Manager</button>}
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
