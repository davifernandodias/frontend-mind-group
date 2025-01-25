import { ProductBarHeader } from "./ui/menubar-products";
import { ModeToggle } from "./ui/modeToggle";
import ProfileIconClerk from "./ui/profile-icon-clerk";


export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 h-auto bg-zinc-50 dark:bg-stone-900">
      {/* Profile Icon */}
      <ProfileIconClerk />

      {/* Center Section */}
      <div className="flex flex-1 items-center justify-center gap-4 text-neutral-800 dark:text-neutral-100 font-medium">
        <p className="text-sm">Painel</p>
        <span className="text-neutral-400">/</span>
        <ProductBarHeader />
      </div>

      {/* Toggle Button */}
      <ModeToggle />
    </header>
  );
}
