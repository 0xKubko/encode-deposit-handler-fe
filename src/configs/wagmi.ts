import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Encode Bootcamp Deposits',
  projectId: '347da63bcb1904ec2a5602ce20e207dc',
  chains: [
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS ? [polygonAmoy] : []),
  ],
  ssr: true,
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
    [polygonAmoy.id]: http(process.env.NEXT_PUBLIC_AMOY_ALCHEMY_API_KEY),
  },
});