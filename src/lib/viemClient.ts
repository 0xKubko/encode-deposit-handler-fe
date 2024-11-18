import dotenv from "dotenv";
import { createPublicClient, http } from "viem";
import { Chain } from "viem";

dotenv.config();

export const getViemClientPublic = (chain: Chain) =>
  createPublicClient({
    chain,
    transport: http(`${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  });
