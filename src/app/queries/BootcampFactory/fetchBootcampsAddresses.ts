import { contractFactoryAddress, logsFromBlock } from "@/app/const";
import { Address, parseAbiItem, PublicClient } from "viem";

export async function fetchBootcampsAddresses(publicClient: PublicClient | undefined): Promise<Address[] | Error> {
    if (!publicClient) {
        return [];
    }
    try {
        const logs = await publicClient.getLogs({
            address: contractFactoryAddress,
            event: parseAbiItem('event BootcampCreated(address indexed bootcampAddress)'),
            fromBlock: logsFromBlock,
        })
        const addresses = logs.map(log => log.args.bootcampAddress as Address);
        return addresses;
    } catch (error) {
        return error as Error;
    }
}
