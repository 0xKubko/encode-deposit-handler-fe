import { useAccount } from 'wagmi';
import { addressIsManager } from '../functions/BootcampFactory/hasRole';
import { useQuery } from '@tanstack/react-query';

export function useIsManager(){
    const account = useAccount();
    const { data: isManager, refetch: refetchManager } = useQuery({
        queryKey: ['isManager', account.address],
        queryFn: () => addressIsManager(account.address || '0x').then((result) => {
            if (result.ok) {
                return result.value;
            }
            return false;
        }),
        enabled: !!account.address, // Ensure the query only runs when account.address is available
    });

    return { isManager, refetchManager };
}