"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useParams } from "next/navigation";


export function ProductBarHeader() {
  const params = useParams<{ id: string; item: string }>();
  const { id } = params;
  return (
  <Menubar>
<MenubarMenu>
  <MenubarTrigger className="text-sm">Produtos</MenubarTrigger>
  <MenubarContent>
    <MenubarItem onClick={() => console.log(id)}>
      <Link href={`/painel/${id}/produto`}>Ver Produtos</Link><MenubarShortcut>⌘</MenubarShortcut>
    </MenubarItem>
  </MenubarContent>
</MenubarMenu>
</Menubar>
  );
}