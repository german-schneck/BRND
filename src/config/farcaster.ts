import { PropsWithChildren, useEffect } from "react";
import FrameSDK from "@farcaster/frame-sdk";

export const farcasterConfig = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'brnd.land',
  siweUri: 'https://example.com/login',
};

export function FarcasterFrameProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const load = async () => {
      FrameSDK.actions.ready();
    };
    load();
  }, []);

  return children;
}