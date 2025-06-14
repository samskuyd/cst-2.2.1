import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  RainbowKitProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';
import { SoundProvider } from './contexts/SoundContext';

const projectId = '3bf26c277abb57e44af9fcc2121db184';
const chains = [base];

const { wallets, connectors } = getDefaultWallets({
  appName: 'Cigar Fam',
  projectId,
  chains,
});

const config = createConfig({
  chains,
  connectors,
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <SoundProvider>
              <Toaster />
              <App />
            </SoundProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);