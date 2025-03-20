import { useAccount, useBalance } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatEther } from "@/lib/utils";

export function WalletBalance() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Баланс кошелька</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Подключите кошелек для просмотра баланса
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Баланс кошелька</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-bold">
              {data ? `${formatEther(data.value)} ${data.symbol}` : "0 ETH"}
            </p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
