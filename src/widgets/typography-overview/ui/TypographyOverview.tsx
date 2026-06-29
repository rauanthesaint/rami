import { type TypographyScale } from "@/shared/typography";
import styles from "./TypographyOverview.module.scss";
import clsx from "clsx";

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
            {size}px, {weight}
          </div>
          <p
            className="whitespace-nowrap"
            style={{
              fontFamily: `"${scale.config.font.name} Variable", ${scale.config.font.type}`,
              fontSize: size,
              fontWeight: weight,
              lineHeight: `${lineHeight}px`,
            }}
          >
            {phrase}
          </p>
        </article>
      ))}
    </section>
  );
}
