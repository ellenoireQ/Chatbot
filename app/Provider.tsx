"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import React, { ReactElement } from "react";
import { store } from "./reduxjs/store";

export default function ReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
