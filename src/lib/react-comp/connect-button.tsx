import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  WagmiProvider,
  http,
  createConfig
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// wagmi + rainbowkit 최신 설정
const { connectors } = getDefaultWallets({
  appName: 'Virtual Bitcoin',
  projectId: '88d779147f818e49e16a5eb89a3510f5',
});

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(), // RPC를 설정
  },
  connectors,
  ssr: false, // (선택) SSR 사용하지 않을 경우
});

function createButtonContainer(container: HTMLElement) {
  const root = createRoot(container);
  root.render(
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <ConnectButton />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export { createButtonContainer };
