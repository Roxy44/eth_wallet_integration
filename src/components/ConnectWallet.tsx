import { useConnect, useAccount, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { formatAddress } from "@/lib/utils";

export function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Address: {formatAddress(address)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Отключить
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => connect({ connector: connectors[0] })}
        disabled={isPending}
      >
        {isPending ? "Подключение..." : "Подключить кошелек"}
      </Button>
    </>
  );
}
