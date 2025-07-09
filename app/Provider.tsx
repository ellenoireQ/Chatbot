"use client";
import { Provider } from "react-redux";
import React, { ReactElement } from "react";
import { store } from "./reduxjs/store";

export default function ReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
