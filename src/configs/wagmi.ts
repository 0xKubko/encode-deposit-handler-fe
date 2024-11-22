import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

import {
  type Chain
} from 'viem'


const tenderlyId = 112233;
export const tenderlyPolygonMainnet
  = {
    id
      : tenderlyId,
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
            : [`https://virtual.polygon.rpc.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_KEY}`]
      },
    },
  } as const satisfies Chain


const transports: { [key: number]: ReturnType<typeof http> } = {};

if (process.env.NEXT_PUBLIC_ENABLE_TESTNET_TENDERLY && process.env.NEXT_PUBLIC_TENDERLY_KEY) {
  transports[tenderlyId] = http(`https://virtual.polygon.rpc.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_KEY}`);
} 
else if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  transports[polygon.id] = http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`);
} else {
  transports[polygon.id] = http();
}
transports[polygonAmoy.id] = process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY ? http(`https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY}`) : http();

export const config = getDefaultConfig({
  appName: 'Encode Bootcamp Deposits',
  projectId: '347da63bcb1904ec2a5602ce20e207dc',
  chains: [
    (process.env.NEXT_PUBLIC_ENABLE_TESTNET_TENDERLY ? tenderlyPolygonMainnet : polygon),
    ...(process.env.NEXT_PUBLIC_ENABLE_AMOY_TESTNET ? [polygonAmoy] : []),
  ],
  transports: transports,
});