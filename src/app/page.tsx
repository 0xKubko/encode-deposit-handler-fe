'use client';

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { LandingUser } from './components/LandingUser';
import { useIsAdmin, useIsManager } from './store/selectors';

export default function Home() {
  const account = useAccount();
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();
  const router = useRouter(); // It may be better to not use rooting to keep the authentications simple

  if (account.isDisconnected || isAdmin || isManager) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Encode Bootcamp Deposits</h1>
        <ConnectButton />
        <div className='flex flex-row gap-6'>
        {isAdmin && <button className="btn btn-primary" onClick={() => router.push('/admin')}>Admin</button>}
        {isManager && <button className="btn btn-active btn-secondary" onClick={() => router.push('/manager')}>Manager</button>}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Encode Bootcamp Deposits</h1>
        <ConnectButton />
        <LandingUser />
      </div>
    );
  }
}
