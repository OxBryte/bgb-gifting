import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
} from "@coinbase/onchainkit/wallet";
import { createWalletAdapter } from "thirdweb/wallets";
import { ConnectButton, useSetActiveWallet } from "thirdweb/react";
import {
  useAccount,
  useDisconnect,
  useWalletClient,
  useSwitchChain,
} from "wagmi";
import { viemAdapter } from "thirdweb/adapters/viem";
import { useEffect } from "react";
import { defineChain } from "thirdweb/chains";
import { CLIENT } from "~/constants";

export function WalletComponents() {
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const setActiveWallet = useSetActiveWallet();

  const connectButtonColor = isConnected
    ? "bg-gray-200"
    : "bg-blue-600 hover:bg-blue-700";
  const connectButtonTextSize = isConnected ? "text-md" : "text-lg";

  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          walletClient: walletClient as any, // accounts for wagmi/viem version mismatches
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client: CLIENT,
          adaptedAccount,
          chain: defineChain(await walletClient.getChainId()),
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            await switchChainAsync({ chainId: chain.id as 8453 });
          },
        });
        void setActiveWallet(thirdwebWallet);
      }
    };
    void setActive();
  }, [disconnectAsync, setActiveWallet, switchChainAsync, walletClient]);

  if (isConnected) {
    return <ConnectButton client={CLIENT} theme="light" />;
  }

  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet
          className={`px-4 py-2 ${connectButtonTextSize} font-bold text-white ${connectButtonColor} flex items-center gap-2 rounded-md`}
        >
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown className="z-20">
          <Identity className="px-4 pb-2 pt-3" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
