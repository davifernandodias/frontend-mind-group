import { ProductBarHeader } from "./ui/header-collapse-products";
import { ModeToggle } from "./ui/modeToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

export function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Limpar o localStorage e redirecionar para a página de login
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/"); // Redireciona para a página de login
  };
  // eslint-disable-next-line prefer-const
  let userId = JSON.parse(localStorage.getItem("user") || '{}')?.id;


  return (
    <header className="flex items-center justify-between px-6 py-4 h-auto bg-zinc-50 dark:bg-stone-900">
      {/* Profile Icon */}
      <div className="flex items-center gap-4">
        <DropdownMenu>

        <Button onClick={handleLogout} >
          Sair
        </Button>
        </DropdownMenu>
      </div>

      {/* Center Section */}
      <div className="flex flex-1 items-center justify-center gap-4 text-neutral-800 dark:text-neutral-100 font-medium">
        <Link href={`/painel/${userId}`}>
          <p className="text-sm text-gray-700 dark:text-white relative group">
            Painel
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-color transition-all duration-500 group-hover:w-full"></span>
          </p>
        </Link>

        <span className="text-neutral-400">/</span>
        <ProductBarHeader />
      </div>

      {/* Toggle Button */}
      <ModeToggle />
    </header>
  );
}
