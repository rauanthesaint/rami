import { type TypographyScale } from "@/shared/typography";
import styles from "./TypographyOverview.module.scss";
import clsx from "clsx";

export function TypographyOverview({ scale }: { scale: TypographyScale }) {
  return (
    <section className={clsx(styles.TypographyOverview, "no-scrollbar")}>
      {scale.steps.map(({ size, weight, lineHeight }, index) => (
        <article key={index} className={styles.TypographyStepCard}>
          <header className={styles.TypographyStepCard__header}>
            <span className="text-sm">
              Font size: {size}px, Font weight: {weight}, Line height:{" "}
              {lineHeight}px
            </span>
          </header>
          <p
            className="whitespace-nowrap"
            style={{
              fontFamily: `"${scale.config.font.name} Variable", ${scale.config.font.type}`,
              fontSize: size,
              fontWeight: weight,
              lineHeight: `${lineHeight}px`,
            }}
          >
            How vexingly quick daft zebras jump
          </p>
        </article>
      ))}
    </section>
  );
}
