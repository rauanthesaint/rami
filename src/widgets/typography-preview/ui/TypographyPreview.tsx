import type { TypographyScale, TypographyStep } from "@/shared/typography";
import styles from "./TypographyPreview.module.scss";
import type { CSSProperties } from "react";

const blockNames = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body",
  "small",
] as const;
type BlockName = (typeof blockNames)[number];
function generateBlocks(
  steps: TypographyStep[]
): Record<BlockName, CSSProperties> {
  return Object.fromEntries(
    blockNames.map((block, i) => {
      const { size, weight, lineHeight } = steps[i];
      return [
        block,
        {
          fontSize: size,
          fontWeight: weight,
          lineHeight: lineHeight,
        },
      ];
    })
  ) as Record<BlockName, CSSProperties>;
}

export function TypographyPreview({ scale }: { scale: TypographyScale }) {
  const { steps } = scale;
  const { h1, h2, h3, h4, h5, h6, body, small } = generateBlocks(steps);

  return (
    <section className={styles.TypographyPreview}>
      <div className="-mx-4 no-scrollbar max-h-[90vh] overflow-y-auto px-4">
        <h1 style={h1}>Typography in Product Design</h1>

        <p style={body}>
          Every product communicates through type. Before a user reads a single
          word, the size, weight, and spacing of text tells them what matters
          and what does not. Typography is not a visual afterthought. It is the
          primary layer of meaning in most digital interfaces. Getting it right
          means users trust the product. Getting it wrong means they leave.
        </p>

        <h2 style={h2}>The Role of Visual Hierarchy</h2>

        <p style={body}>
          Visual hierarchy organizes information by importance. A page title
          tells the user where they are. Section headings break content into
          scannable chunks. Body text delivers the detail. Without this
          structure, every element competes for attention equally, and the user
          loses orientation within seconds. A well-defined hierarchy lets users
          find what they need without reading everything on the page.
        </p>

        <h3 style={h3}>How a Type Scale Works</h3>

        <p style={body}>
          A type scale is a set of font sizes derived from a single base value
          and a fixed ratio. Multiply the base by the ratio to get the next step
          up. Divide to get the step below. This produces sizes that feel
          harmonically related rather than picked at random. The ratio
          determines how dramatic the contrast is between levels. A ratio of
          1.25 creates a subtle scale suited to dense interfaces. A ratio of 1.5
          produces a bolder contrast better suited to editorial or marketing
          layouts.
        </p>

        <h4 style={h4}>Picking the Right Base Size</h4>

        <p style={body}>
          The base size anchors everything else. Most interfaces use 16px
          because it matches the default reading size in browsers and reflects
          decades of research into screen readability. Smaller bases compress
          the scale and make body text harder to read. Larger bases push
          headings into display territory and may break layouts designed for
          standard content widths. Changing the base by even two pixels shifts
          every size across the entire scale.
        </p>

        <h5 style={h5}>Line Height and Spacing</h5>

        <p style={body}>
          Line height controls how much vertical space sits between lines of
          text. Body text needs a line height of 1.5 to 1.7 to remain
          comfortable across multiple paragraphs. Headings can use tighter
          values between 1.1 and 1.3 because they are shorter and larger.
          Incorrect line height is one of the most common typography mistakes.
          Too tight and text feels suffocating. Too loose and lines lose their
          connection to each other.
        </p>

        <h6 style={h6}>Weight, Tracking, and Color</h6>

        <p style={body}>
          Font weight adds emphasis without increasing size. A semibold label
          next to regular body text draws attention without disrupting the
          scale. Letter spacing, or tracking, improves legibility at small sizes
          and adds refinement at large display sizes. Color contrast between
          heading and body text creates a secondary layer of hierarchy that
          supports the size-based structure. These details are small
          individually but together they determine whether a typographic system
          feels polished or unfinished.
        </p>

        <small style={small} className="text-muted-foreground">
          Typography Preview • Scale ratio applied to all heading and body
          levels • June 29, 2026
        </small>
      </div>
    </section>
  );
}
