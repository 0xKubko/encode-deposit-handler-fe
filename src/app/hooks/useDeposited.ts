import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { checkDeposited } from '../queries/DepositHandler/checkDeposited';


/** Passing addresss as argument in case we want another user to deposit on the behalf 
 * of another user
 */
export function useDeposited(address: Address, bootcampAddress: Address) {
    const account = useAccount();
    const { data: isDeposited, refetch: refetchDepositing, isLoading: isDepositedLoading } = useQuery({
        queryKey: ['isDeposited', address],
        queryFn: () => checkDeposited(address,bootcampAddress),
        enabled: !!account.address, // Ensure the query only runs when account.address is available
    });

    return { isDeposited,refetchDepositing, isDepositedLoading };
}