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
  authClient.useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/10 shadow-md backdrop-blur-xl dark:bg-black/10 dark:backdrop-blur-lg">
      <div className="container mx-auto flex w-full items-center justify-between p-5">
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
            <SheetContent className="w-[85vw] max-w-[370px] p-0">
              <SheetHeader className="border-b px-5 py-6 text-left">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
