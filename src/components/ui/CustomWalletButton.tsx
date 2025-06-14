import React, { useState, useCallback } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { formatEther } from 'viem';
import { toast } from 'sonner';
import { Copy, ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { useSoundContext } from '../../contexts/SoundContext';

const CustomWalletButton: React.FC = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { playSound } = useSoundContext();

  const handleCopyAddress = useCallback(async () => {
    if (!address) return;
    playSound('/assets/sounds/robot-click.wav');
    
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied!', { position: 'bottom-center' });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy address', { position: 'bottom-center' });
    }
  }, [address, playSound]);

  const handleDisconnect = useCallback(async () => {
    playSound('/assets/sounds/robot-click.wav');
    try {
      if (connector?.id === 'metaMask' && window.ethereum) {
        await window.ethereum.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
      }
      disconnect();
      setShowProfile(false);
    } catch (error) {
      console.error('Error during disconnect:', error);
      toast.error('Failed to disconnect wallet', { position: 'bottom-center' });
    }
  }, [connector, disconnect, playSound]);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const formatBalanceDisplay = (balanceData: typeof balance) => {
    if (!balanceData) return '0 ETH';
    const fullBalance = formatEther(balanceData.value);
    const [integerPart, decimalPart = ''] = fullBalance.split('.');
    const significantDecimals = decimalPart.slice(0, 4);
    return `${integerPart}${significantDecimals ? `.${significantDecimals}` : ''} ETH`;
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, mounted }) => {
        if (!mounted) return null;
        
        if (!account || !chain) {
          return (
            <button
              onClick={() => {
                playSound('/assets/sounds/robot-click.wav');
                openConnectModal();
              }}
              className="button-primary px-6 py-3 bg-transparent border-2 border-cyan-glow text-cyan-glow 
                       font-orbitron text-sm hover:bg-cyan-glow/20 transition-all duration-300 rounded 
                       flex items-center justify-center relative overflow-hidden"
            >
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              onClick={() => {
                playSound('/assets/sounds/robot-click.wav');
                openChainModal();
              }}
              className="button-primary px-6 py-3 bg-transparent border-2 border-red-500 text-red-500
                       font-orbitron text-sm hover:bg-red-500/20 transition-all duration-300 rounded
                       flex items-center justify-center relative overflow-hidden"
            >
              Wrong Network
            </button>
          );
        }

        return (
          <div className="relative">
            <button
              onClick={() => {
                playSound('/assets/sounds/robot-click.wav');
                setShowProfile(!showProfile);
              }}
              className="button-primary px-4 py-2 bg-transparent border-2 border-cyan-glow text-cyan-glow
                       font-orbitron text-sm hover:bg-cyan-glow/20 transition-all duration-300 rounded
                       flex items-center justify-center gap-2"
            >
              <span>{truncateAddress(account.address)}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md border border-cyan-glow/30
                            rounded-lg shadow-xl z-50 animate-fadeIn">
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg">
                      <span className="text-sm text-gray-300 break-all">{truncateAddress(account.address)}</span>
                      <button
                        onClick={handleCopyAddress}
                        className="text-cyan-glow hover:text-cyan-glow/80 transition-colors ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-black/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Balance</span>
                        <span className="text-cyan-glow font-orbitron">
                          {formatBalanceDisplay(balance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        playSound('/assets/sounds/robot-click.wav');
                        window.open(`https://basescan.org/address/${account.address}`, '_blank');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300
                               hover:text-cyan-glow transition-colors"
                    >
                      <span>View on Explorer</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={handleDisconnect}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-400
                               hover:text-red-300 transition-colors"
                    >
                      <span>Disconnect</span>
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomWalletButton;