'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUserStore } from '../store/zustandStore';
import { addressIsAdmin, addressIsManager } from '../functions/BootcampFactory/hasRole';

const useAccountListener = () => {
    const account = useAccount();
    const setAdmin = useUserStore((state) => state.setAdmin);
    const setManager = useUserStore((state) => state.setManager);


    useEffect(() => {
        if (account.address) {
            // Logic to determine if the account is admin or manager
            addressIsAdmin(account.address).then(result => { if (result.ok) { setAdmin(result.value) } });
            addressIsManager(account.address).then(result => { if (result.ok) { setManager(result.value) } });
        } else {
            setAdmin(false);
            setManager(false);
        }

        return () => {
            setAdmin(false);
            setManager(false);
        }
    }, [account.address, setAdmin, setManager]);
};

export default useAccountListener;