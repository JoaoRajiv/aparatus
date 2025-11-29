"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SidebarMenu from "./sidebar-menu";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed flex top-0 left-0 right-0 items-center justify-between px-5 pb-3 pt-4 shadow-md bg-white/10 dark:bg-black/10 z-50 backdrop-blur-xl dark:backdrop-blur-lg">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          className="dark:invert"
          alt="Aparatus"
          width={100}
          height={26.09}
        />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="icon" asChild>
          <Link href="/chat">
            <MessageCircleIcon />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-none">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[370px] p-0">
            <SheetHeader className="border-b px-5 py-6 text-left">
              <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
            </SheetHeader>
            <SidebarMenu />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
