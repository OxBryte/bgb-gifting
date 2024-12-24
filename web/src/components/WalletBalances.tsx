import { api } from "~/utils/api";
import { TokenOption } from "./Option/Token";
import { type FC, useState } from "react";
import { type WalletBalancesProps } from "~/types/zapper";
import { NftOption } from "./Option/Nft";

export const WalletBalances: FC<WalletBalancesProps> = ({ address }) => {
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [isNftOpen, setIsNftOpen] = useState(false);
  const { data } = api.wallet.getBalances.useQuery(
    { address },
    {
      enabled: !!address,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  // console.log(data?.tokenBalances);

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      {/* Tokens */}
      <button
        onClick={() => setIsTokenOpen(!isTokenOpen)}
        className="flex w-full items-center gap-2"
      >
        <div
          className={`transform transition-transform ${isTokenOpen ? "rotate-90" : ""}`}
        >
          ▶
        </div>
        <h2 className="text-lg font-bold">Tokens</h2>
      </button>
      <div
        className={`content flex max-h-96 flex-col gap-4 overflow-y-auto rounded-lg p-4 transition-all duration-200 ${isTokenOpen ? "visible max-h-[500px] opacity-100" : "hidden max-h-0 overflow-hidden opacity-0"}`}
      >
        {data?.tokenBalances
          .filter((tokenBalance) => tokenBalance.token.balanceUSD > 0.01)
          .map((tokenBalance) => {
            return (
              <TokenOption
                key={`${tokenBalance.address}-${tokenBalance.token.baseToken.symbol}`}
                option={tokenBalance}
              />
            );
          })}
      </div>

      {/* NFTs */}
      {/* <button 
        onClick={() => setIsNftOpen(!isNftOpen)}
        className="flex items-center gap-2 w-full"
      >
        <div className={`transform transition-transform ${isNftOpen ? 'rotate-90' : ''}`}>
          ▶
        </div>
        <h2 className="text-lg font-bold">NFTs</h2>
      </button>
      <div className={`max-h-96 p-4 rounded-lg overflow-y-auto grid grid-cols-2 sm:grid-cols-3 place-items-center gap-4 content transition-all duration-200 ${isNftOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 overflow-hidden hidden'}`}>
        {data?.nfts.map((nft) => {
          return (
            <NftOption key={nft.tokenId} nft={nft} />
          )
        })}
      </div> */}
    </div>
  );
};
