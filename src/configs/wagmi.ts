import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Encode Bootcamp Deposits',
  projectId: '347da63bcb1904ec2a5602ce20e207dc',
  chains: [
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [polygonAmoy] : []),
  ],
  ssr: true,
});