import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import {fetchBootcampDetail } from '../queries/BootcampFactory/fetchBootcampDetail';


export function useBootcampDetails(bootcampAddress: Address) {
    const { data: bootcamp, refetch: refetchBootcamp, isLoading } = useQuery({
        queryKey: [bootcampAddress],
        queryFn: () => fetchBootcampDetail(bootcampAddress),
    });

    return { bootcamp, refetchBootcamp, isLoading };
}