
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { getAllowance } from '@/app/queries/ERC20/getAllowance';



export function useAllowance(bootcampAddress:Address, userAddress:Address, tokenAddress: Address) {
    const { data: allowance, refetch: refetchAllowance } = useQuery({
        queryKey: ['allowance', bootcampAddress,userAddress,tokenAddress],
        queryFn: () => getAllowance(bootcampAddress,userAddress,tokenAddress),
    });

    return {allowance, refetchAllowance};
}