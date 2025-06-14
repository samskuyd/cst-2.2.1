import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { ArrowLeft, Rocket, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import CustomWalletButton from '../components/ui/CustomWalletButton';
import ParticleBackground from '../components/ui/ParticleBackground';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ClaimResponse {
  status: string;
  message: string;
  allocation?: number;
  claimed?: boolean;
}

function ClaimPage() {
  const { address, isConnected } = useAccount();
  const [allocation, setAllocation] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  const checkAllocation = async () => {
    if (!address) {
      toast.error('Please connect your wallet first', { position: 'bottom-center' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/check-allocation/${address}`);
      const data: ClaimResponse = await response.json();

      if (response.ok && data.status === 'success') {
        setAllocation(data.allocation || 0);
        setHasClaimed(data.claimed || false);
        if (data.allocation === 0) {
          toast.error('No allocation found for this address', { position: 'bottom-center' });
        }
      } else {
        toast.error(data.message || 'Failed to check allocation', { position: 'bottom-center' });
      }
    } catch (error) {
      console.error('Error checking allocation:', error);
      toast.error('Failed to connect to the server', { position: 'bottom-center' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!address || !allocation) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: address }),
      });

      const data: ClaimResponse = await response.json();

      if (response.ok && data.status === 'success') {
        setHasClaimed(true);
        toast.success('Successfully claimed your allocation!', { position: 'bottom-center' });
      } else {
        toast.error(data.message || 'Failed to claim allocation', { position: 'bottom-center' });
      }
    } catch (error) {
      console.error('Error claiming allocation:', error);
      toast.error('Failed to connect to the server', { position: 'bottom-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-spaceMono relative">
      <ParticleBackground />
      <div className="scanline-overlay"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-cyan-glow hover:text-cyan-glow/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mission Control
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Rocket className="h-12 w-12 text-cyan-glow mx-auto mb-4" />
            <h1 className="font-orbitron text-3xl md:text-4xl text-white mb-4 glow-text">
              Claim Your <span className="text-cyan-glow">$CIGAR</span> Allocation
            </h1>
            <p className="text-gray-400">
              Connect your wallet to check and claim your $CIGAR allocation from the Terran Alliance airdrop.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-glow/30 rounded-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col items-center gap-6">
              <div className="w-full flex justify-center">
                <CustomWalletButton />
              </div>

              {isConnected && (
                <Button
                  onClick={checkAllocation}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Checking...' : 'Check Allocation'}
                </Button>
              )}

              {allocation !== null && (
                <div className="w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Coins className="h-6 w-6 text-cyan-glow" />
                    <span className="font-orbitron text-2xl text-cyan-glow">
                      {allocation.toLocaleString()} $CIGAR
                    </span>
                  </div>

                  {!hasClaimed && allocation > 0 && (
                    <Button
                      onClick={handleClaim}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 'Claim Tokens'}
                    </Button>
                  )}

                  {hasClaimed && (
                    <p className="text-green-400 font-orbitron">
                      Allocation Successfully Claimed!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Make sure you're connected to the Base Network.</p>
            <p>Tokens will be transferred directly to your connected wallet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimPage;