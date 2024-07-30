"use client";

import { SignUp } from "@clerk/nextjs";
import { experimental__simple, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  const baseTheme = theme === "light" ? experimental__simple : shadesOfPurple;

  return <SignUp appearance={{ baseTheme }} />;
}
