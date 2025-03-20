import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatAddress } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

// etherscan generated api key
const ETHERSCAN_API_KEY = "ZK56T6ACDSANSWKW1FN4HFX8B6B42722JC";

export function TransactionHistory() {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      if (!address) return;

      try {
        setIsLoading(true);

        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
        );

        const data = await response.json();

        if (data.status === "1") {
          setTransactions(data.result.slice(0, 5)); // 5 последних транзакций
        }
      } catch (error) {
        console.error("Ошибка при загрузке транзакций:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isConnected) {
      fetchTransactions();
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>История транзакций</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Подключите кошелек для просмотра транзакций
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>История транзакций</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Загрузка транзакций...</p>
        ) : transactions.length === 0 ? (
          <p className="text-muted-foreground">Транзакции не найдены</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.hash} className="pb-3">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {tx.from.toLowerCase() === address?.toLowerCase()
                      ? "Отправлено"
                      : "Получено"}
                  </span>
                  <span
                    className={
                      tx.from.toLowerCase() === address?.toLowerCase()
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {tx.from.toLowerCase() === address?.toLowerCase()
                      ? "-"
                      : "+"}
                    {tx.value} ETH
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {tx.from.toLowerCase() === address?.toLowerCase()
                    ? `Кому: ${formatAddress(tx.to)}`
                    : `От: ${formatAddress(tx.from)}`}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
