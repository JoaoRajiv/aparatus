import React from "react";
import { cn } from "@/lib/utils";

export const PageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-5 space-y-6", className)}>{children}</div>;
};

export const PageSectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-xs text-foreground font-semibold uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const PageSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={cn("space-y-3", className)}>{children}</section>;
};

export const PageSectionScroller = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};
