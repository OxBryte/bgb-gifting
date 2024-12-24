import { useAccount } from "wagmi";
import { CreateGiftPack } from "~/components/CreateGiftPack";
import { PackContents } from "~/components/PackContents";
import { PackValue } from "~/components/PackValue";
import { WalletBalances } from "~/components/WalletBalances";
import { useGiftItems } from "~/contexts/GiftItemsContext";
import { Password } from "~/components/Password";
import Image from "next/image";

export default function Home() {
  const { address } = useAccount();
  const { selectedAssets, hash } = useGiftItems();

  return (
    <>
      <div className="mx-auto mt-10 flex w-full flex-col items-center gap-4 max-w-xl">
        <Image src="/message.svg" alt="logo" width={360} height={360} />
        <div className="h-[340px] max-w-[640px] overflow-hidden object-center rounded-2xl">
          <video
            src="/base-anim.mp4"
            className="object-cover !object-center"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <PackValue />
        {address && <WalletBalances address={address} />}
        {address && <Password />}
        <PackContents />
        <CreateGiftPack
          erc20s={selectedAssets.erc20}
          erc721s={selectedAssets.erc721}
          erc1155s={selectedAssets.erc1155}
          ethAmount={selectedAssets.ethAmount}
          hash={hash}
        />
      </div>
    </>
  );
}
