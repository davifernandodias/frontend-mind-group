import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
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
      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
    </MenubarItem>
    <MenubarItem>New Window</MenubarItem>
    <MenubarSeparator />
    <MenubarItem>Share</MenubarItem>
    <MenubarSeparator />
    <MenubarItem>Print</MenubarItem>
  </MenubarContent>
</MenubarMenu>
</Menubar>
  );
}