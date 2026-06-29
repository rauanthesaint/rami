import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { useState } from "react";

type CopyTextProps = {
  children: string | string[];
  className?: string;
};

export function CopyText({ children, className }: CopyTextProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(
        Array.isArray(children) ? children.join("") : children
      );
      setIsCopied(true);
      const timer = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={onClick}>
        <span className={clsx("underline decoration-dashed", className)}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>{isCopied ? "Copied" : "Copy"}</TooltipContent>
    </Tooltip>
  );
}
