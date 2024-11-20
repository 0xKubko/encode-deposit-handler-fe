import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

import {
  type Chain
} from 'viem'

export const tenderlyPolygonMainnet
  = {
    id
      : 112233,
    name
      : 'Tenderly (TendlerlyForkPolygonMainnet)',
    nativeCurrency
      : {
        name
          : 'Polygon', symbol
        : 'POL', decimals
        : 18
    },
    rpcUrls
      : {
      default
        : {
          http
            : ['https://virtual.polygon.rpc.tenderly.co/5712eea3-af8c-490b-aae4-2137b578b172']
      },
    },
    blockExplorers
      : {
      default
        : {
          name
            : 'Etherscan', url
          : 'https://etherscan.io'
      },
    },
    contracts
      : {
      ensRegistry
        : {
        address
          : '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      },
      ensUniversalResolver
        : {
        address
          : '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
        blockCreated
          : 16773775,
      },
      multicall3
        : {
        address
          : '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated
          : 14353601,
      },
    },
  } as const satisfies Chain


const transports: { [key: number]: ReturnType<typeof http> } = {};
transports[polygon.id] = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`) : http();
// transports[polygonAmoy.id] = process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY ? http(`https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY}`) : http();
// transports[polygonAmoy.id] = process.env.NEXT_PUBLIC_TENDERLY_AMOY_KEY ? http(`https://polygon-amoy.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_AMOY_KEY}`) : http();

export const config = getDefaultConfig({
  appName: 'Encode Bootcamp Deposits',
  projectId: '347da63bcb1904ec2a5602ce20e207dc',
  chains: [
    tenderlyPolygonMainnet,
    // polygon,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS ? [polygonAmoy] : []),
  ],
  // transports: transports,
});