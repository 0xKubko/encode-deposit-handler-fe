import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

let transports: { [key: number]: ReturnType<typeof http> } = {};
transports[polygon.id] = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`) : http();
transports[polygonAmoy.id] = process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY ? http(`https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY}`) : http();

export const config = getDefaultConfig({
  appName: 'Encode Bootcamp Deposits',
  projectId: '347da63bcb1904ec2a5602ce20e207dc',
  chains: [
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS ? [polygonAmoy] : []),
  ],
  transports: transports,
});