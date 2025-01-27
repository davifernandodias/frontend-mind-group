import { ProductBarHeader } from "./ui/header-collapse-products";
import { ModeToggle } from "./ui/modeToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

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
          <DropdownMenuTrigger>
            <button className="text-gray-700 dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className="sr-only">Perfil</span>
              {/* Icone de perfil ou usuário */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.406-1.406a9.953 9.953 0 00-1.04-12.466C16.007 3.58 12.493 3 10 3 6.582 3 4 5.582 4 8s2.582 5 6 5c.447 0 .88-.027 1.302-.08a8.016 8.016 0 01.91 3.93L15 17z" />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-md w-48">
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
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
