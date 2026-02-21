"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): React.JSX.Element => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
