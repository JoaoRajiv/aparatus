"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Copy, Check, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface PhoneItemProps {
  phone: string;
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      toast.success("Telefone copiado com sucesso!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar telefone");
    }
  };

  return (
    <Card className="flex flex-row items-center justify-between p-2 w-full gap-2">
      <div className="flex items-center gap-2">
        <Smartphone className="size-5 text-primary" />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        size="sm"
        variant={`${copied ? "default" : "outline"}`}
        onClick={handleCopyPhone}
        className="gap-2 rounded-4xl"
      >
        {copied ? (
          <>
            <Check className="size-4" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copiar
          </>
        )}
      </Button>
    </Card>
  );
};
