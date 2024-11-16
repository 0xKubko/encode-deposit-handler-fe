import { useAccount } from 'wagmi';
import { addressIsAdmin } from '../functions/BootcampFactory/hasRole';
import { useQuery } from '@tanstack/react-query';


export function useIsAdmin(){
    const account = useAccount();
    const { data: isAdmin, refetch: refetchAdmin } = useQuery({
        queryKey: ['isAdmin', account.address],
        queryFn: () => addressIsAdmin(account.address || '0x').then((result) => {
            if (result.ok) {
                return result.value;
            }
            return result;
        })
    });

    return { isAdmin, refetchAdmin };
}