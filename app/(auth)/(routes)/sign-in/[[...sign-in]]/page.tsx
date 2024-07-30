"use client";

import { SignIn } from "@clerk/nextjs";
import { shadesOfPurple, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  const baseTheme = theme === "light" ? experimental__simple : shadesOfPurple;

  return <SignIn appearance={{ baseTheme: baseTheme }} />;
}
