import DashboardPage from "@/templates/dashboard";

interface LayoutProps {
  children: React.ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <>
  <DashboardPage>
    {children}
  </DashboardPage>
    </>
  )
}
