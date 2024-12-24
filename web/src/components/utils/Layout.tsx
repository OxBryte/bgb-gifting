import Link from "next/link";
import { WalletComponents } from "./WalletComponents";
import Image from "next/image";
import { useRouter } from "next/router";

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full items-center justify-between border-b px-4 py-6 md:px-20">
        <Link href="/">
          <Image
            src="/base_xmas.svg"
            alt="Logo"
            width={52}
            height={52}
            priority
          />
        </Link>
        {/* {router.pathname !== "/" && (
      )} */}
        <div className="">
          <WalletComponents />
        </div>
      </div>
      {children}
    </main>
  );
}
