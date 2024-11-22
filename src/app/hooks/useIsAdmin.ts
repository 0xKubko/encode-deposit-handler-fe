import { useAccount } from 'wagmi';
import { checkIsAdmin } from '@/app/queries/BootcampFactory/checkRole';
import { useQuery } from '@tanstack/react-query';



export function useIsAdmin(){
    const account = useAccount();
    const { data: isAdmin, refetch: refetchAdmin } = useQuery({
        queryKey: ['isAdmin', account.address],
        queryFn: () => checkIsAdmin(account.address || '0x'),
        enabled: !!account.address, // Ensure the query only runs when account.address is available
    });

    return { isAdmin, refetchAdmin };
}