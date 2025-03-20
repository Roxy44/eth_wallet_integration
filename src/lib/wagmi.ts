import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected({ target: "rabby" })],
  transports: {
    [mainnet.id]: http(),
  },
});
