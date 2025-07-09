"use client";
import { Provider } from "react-redux";
import store from "./reduxjs/store";
import React, { ReactElement } from "react";

export default function ReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
