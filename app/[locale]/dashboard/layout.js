"use client";
import { LayoutProvider } from "@/context/useLayoutContext";
import VerticalLayout from "@/layout/VerticalLayout";
import React from "react";

function layout({ children }) {
  return (
    <LayoutProvider>
      <VerticalLayout>{children}</VerticalLayout>
    </LayoutProvider>
  );
}

export default layout;
