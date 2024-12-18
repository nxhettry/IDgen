"use client";
import { SessionProvider } from "next-auth/react";
import React, { ComponentType } from "react";

type Props = {
  Component: ComponentType;
  pageProps: { session: any };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
