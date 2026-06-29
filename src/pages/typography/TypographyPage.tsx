import { TypographySettings } from "@/widgets/typography-settings";
import { TypographyOverview } from "@/widgets/typography-overview";
import styles from "./TypographyPage.module.scss";
import { generateScale, useTypographyStore } from "@/shared/typography";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TypographyPreview } from "@/widgets/typography-preview";
import { TypographyExport } from "@/widgets/typography-export/ui";

export function TypographyPage() {
  const { config } = useTypographyStore();
  const scale = generateScale(config);
  return (
    <main className={styles.TypographyPage}>
      <TypographySettings />
      <div className={styles.content}>
        <div className={styles.header}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <HugeiconsIcon icon={ViewIcon} />
                <span>Preview</span>
              </Button>
            </DialogTrigger>
            <DialogContent className={styles.PreviewDialog}>
              <TypographyPreview scale={scale} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <span>Export</span>
              </Button>
            </DialogTrigger>
            <TypographyExport scale={scale} />
          </Dialog>
        </div>
        <TypographyOverview scale={scale} />
      </div>
    </main>
  );
}
