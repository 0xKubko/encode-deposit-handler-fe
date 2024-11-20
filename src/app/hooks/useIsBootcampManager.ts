import { useAccount } from 'wagmi';
import { checkIsBootcampManager } from '../queries/BootcampFactory/checkRole';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';



export function useIsBootcampManager(bootcampAddress: Address){
    const account = useAccount();
    const { data: isBootcampManager, refetch: refetchIsBootcampManager } = useQuery({
        queryKey: ['isBootcampManager', account.address, bootcampAddress],
        queryFn: () => checkIsBootcampManager(account.address || '0x', bootcampAddress),
        enabled: !!account.address, // Ensure the query only runs when account.address is available
    });

    return { isBootcampManager, refetchIsBootcampManager };
}