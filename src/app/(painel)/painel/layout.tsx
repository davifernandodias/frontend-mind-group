"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardPage from "@/templates/dashboard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/");  
    }
  }, [router]);

  return (
    <>
      <DashboardPage>
        {children}
      </DashboardPage>
    </>
  );
}
