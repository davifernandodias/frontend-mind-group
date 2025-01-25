import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";


export function ProductBarHeader() {
  return (
  <Menubar>
<MenubarMenu>
  <MenubarTrigger className="text-sm">Produtos</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>
      Ver Protudos<MenubarShortcut>⌘</MenubarShortcut>
    </MenubarItem>
    <MenubarItem>Criar produtos</MenubarItem>
  </MenubarContent>
</MenubarMenu>
</Menubar>
  );
}