
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { getDecimals } from '@/app/queries/ERC20/getDecimals';



export function useDecimals(tokenAddress: Address) {
    const { data: decimals } = useQuery({
        queryKey: ['decimals', tokenAddress],
        queryFn: () => getDecimals(tokenAddress),
    });

    return decimals;
}