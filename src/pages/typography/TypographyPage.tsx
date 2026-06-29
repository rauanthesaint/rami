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
import { Input } from "@/components/ui/input";
import { useState, type ChangeEvent } from "react";

const defaultPhrase = "How vexingly quick daft zebras jump";

export function TypographyPage() {
  const { config } = useTypographyStore();
  const [phrase, setPhrase] = useState<string>("");

  const onPhraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 50) {
      setPhrase(value);
    }
  };

  const scale = generateScale(config);
  return (
    <main className={styles.TypographyPage}>
      <TypographySettings />
      <div className={styles.content}>
        <div className={styles.header}>
          <Input
            value={phrase}
            onChange={onPhraseChange}
            placeholder={defaultPhrase}
          />
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
        <TypographyOverview
          phrase={phrase.length === 0 ? defaultPhrase : phrase}
          scale={scale}
        />
      </div>
    </main>
  );
}
