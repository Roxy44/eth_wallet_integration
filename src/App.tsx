import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./lib/wagmi";

import { ConnectWallet } from "./components/ConnectWallet";
import { WalletBalance } from "./components/WalletBalance";
import { TransactionHistory } from "./components/TransactionHistory";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background p-4 md:p-8">
          <header className="container mx-auto flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold">Ethereum Wallet App</h1>
            <ConnectWallet />
          </header>

          <main className="container mx-auto mt-8 grid gap-8 md:grid-cols-2">
            <WalletBalance />
            <TransactionHistory />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
