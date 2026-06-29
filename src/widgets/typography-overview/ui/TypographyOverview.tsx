import { type TypographyScale } from "@/shared/typography";
import styles from "./TypographyOverview.module.scss";
import clsx from "clsx";
import { CopyText } from "@/shared/copy-text";

export function TypographyOverview({
  scale,
  phrase,
}: {
  scale: TypographyScale;
  phrase: string;
}) {
  return (
    <section className={clsx(styles.TypographyOverview, "no-scrollbar")}>
      {scale.steps.map(({ size, weight, lineHeight }, index) => (
        <article key={index} className={styles.TypographyStepCard}>
          <div className="text-sm text-muted-foreground">
            <CopyText>{size}</CopyText>, {weight}
          </div>
          <p
            className="whitespace-nowrap"
            style={{
              fontFamily: `"${scale.config.font.name} Variable", ${scale.config.font.type}`,
              fontSize: size,
              fontWeight: weight,
              lineHeight: lineHeight,
            }}
          >
            {phrase}
          </p>
        </article>
      ))}
    </section>
  );
}
