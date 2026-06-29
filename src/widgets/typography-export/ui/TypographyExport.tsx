import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import type { TypographyScale } from "@/shared/typography";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

export function generateCSS(scale: TypographyScale): string {
  const names = [
    "t-heading > .3xl",
    "t-heading > .2xl",
    "t-heading > .xl",
    "t-heading > .lg",
    "t-heading > .md",
    "t-heading > .sm",
    "body",
    "small",
  ] as const;

  const rules = names.map((name, i) => {
    const { size, weight, lineHeight } = scale.steps[i];
    return `.${name} {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  line-height: ${lineHeight}px;\n}`;
  });

  return rules.join("\n\n");
}

export function TypographyExport({ scale }: { scale: TypographyScale }) {
  const rules = generateCSS(scale);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(rules);
      toast.success("CSS Rules copied successfully!");
    } catch (error) {
      console.error("Failed to copy CSS:", error);
    }
  };

  return (
    <DialogContent>
      <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
        <pre>
          <code>{rules}</code>
        </pre>
      </div>
      <DialogFooter>
        <Button onClick={onCopy}>
          <span>Copy</span>
          <HugeiconsIcon icon={Copy01Icon} />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
