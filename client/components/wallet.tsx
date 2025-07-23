import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { ConnectButton, darkTheme, getDefaultWallets, RainbowKitProvider, useConnectModal } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getPublicClient } from '@wagmi/core';
import { el } from '@webtaku/el';
import {
  createConfig,
  http,
  WagmiProvider
} from 'wagmi';
import { mainnet } from 'wagmi/chains';

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

let openWalletConnectModal: () => void;

function ConnectModalController() {
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    openWalletConnectModal = () => {
      if (openConnectModal) openConnectModal();
    };
  }, [openConnectModal]);

  return null;
}

function createRainbowKit() {
  const container = el();
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={darkTheme()}>
          <ConnectModalController />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
  return container;
}

function createConnectButton() {
  const container = el();
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={darkTheme()}>
          <ConnectButton />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
  return container;
}
const publicClient = getPublicClient(config, { chainId: mainnet.id });

export {
  createConnectButton, createRainbowKit,
  openWalletConnectModal, publicClient, config as wagmiConfig
};

