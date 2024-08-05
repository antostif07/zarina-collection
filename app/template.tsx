'use client'
import { Toaster } from "@/components/ui/toaster";

export default function Template({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }