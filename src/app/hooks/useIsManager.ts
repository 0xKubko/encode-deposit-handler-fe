import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { checkIsManager } from '../queries/BootcampFactory/checkRole';

export function useIsManager(){
    const account = useAccount();
    const { data: isManager, refetch: refetchManager } = useQuery({
        queryKey: ['isManager', account.address],
        queryFn: () => checkIsManager(account.address || '0x'),
        enabled: !!account.address, // Ensure the query only runs when account.address is available
    });

    return { isManager, refetchManager };
}