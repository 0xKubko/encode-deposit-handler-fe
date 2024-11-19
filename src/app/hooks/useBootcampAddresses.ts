import { usePublicClient } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { fetchBootcampsAddresses } from '../queries/BootcampFactory/fetchBootcampsAddresses';



export function useBootcampAddresses(){
    const publicClient = usePublicClient();
    const { data: addresses, refetch: refetchAddresses, isLoading } = useQuery({
        queryKey: ["bootcampAddresses"],
        queryFn: () => fetchBootcampsAddresses(publicClient),
    });

    return { addresses, refetchAddresses, isLoading};
}