import { auth } from "@clerk/nextjs/server";
import { ProductBarHeader } from "./ui/header-collapse-products";
import { ModeToggle } from "./ui/modeToggle";
import ProfileIconClerk from "./ui/profile-icon-clerk";
import Link from "next/link";

export async function DashboardHeader() {
  const { userId } = await auth();
  return (
    <header className="flex items-center justify-between px-6 py-4 h-auto bg-zinc-50 dark:bg-stone-900">
      {/* Profile Icon */}
      <ProfileIconClerk />

      {/* Center Section */}
      <div className="flex flex-1 items-center justify-center gap-4 text-neutral-800 dark:text-neutral-100 font-medium">
        <Link href={`/painel/${userId}`}>
          <p className="text-sm text-gray-700 relative group">
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
