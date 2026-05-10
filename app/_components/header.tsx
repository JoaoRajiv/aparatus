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
            alt="Aparatus"
            width={120}
            height={32}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 150px, 120px"
            className="dark:invert"
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
            <SheetContent className="w-85vw max-w-92.5 p-0">
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
