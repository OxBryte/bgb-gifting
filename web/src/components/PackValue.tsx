import { useGiftItems } from "~/contexts/GiftItemsContext";
import NumberFlow from '@number-flow/react';
import { useMemo, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
export function PackValue() {
  const { isConnected } = useAccount();
  const { getTotalValueUsd } = useGiftItems();
  const totalValue = useMemo(() => getTotalValueUsd(), [getTotalValueUsd]);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isConnected) return null;

  return (
    <div className={`w-full space-y-4`}>
      <p className="text-lg ">Total Pack Value</p>
      <div className="flex gap-4 items-center justify-between text-xl p-2 border border-black/20 rounded-lg">
        <Image src="/usdc.png" alt="gift" width={38} height={38} />
        <NumberFlow 
          value={totalValue} 
          format={{ style: 'currency', currency: 'USD' }}
        />
      </div>
    </div>
  );
} 