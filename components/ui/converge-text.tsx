"use client";

import { motion, useScroll, useTransform, type MotionValue, type UseScrollOptions, type Variants } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The site's single motion signature, in two flavors:
 *  - "scroll" (default): true scroll-scrubbed convergence — characters track
 *    the user's scroll position in real time (like the original Skiper31
 *    pattern), not a one-shot fade triggered on view entry. Each instance
 *    owns its own scroll target, so it works inside a normal-height section
 *    without needing a dedicated tall scroll-jack block.
 *  - "mount": plays once on mount (used by the hero, which is visible
 *    before any scrolling happens).
 *
 * Characters are grouped per word (each word wrapped in a non-breaking
 * span) with a plain breakable space between words — otherwise the browser
 * treats every per-character span as its own break opportunity and splits
 * words mid-way on narrow viewports (e.g. "CONSTRUYE" -> "CONSTRU" / "YE").
 */

type Tok = { char: string; index: number };

function splitWords(text: string): Tok[][] {
  const words: Tok[][] = [];
  let current: Tok[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      words.push(current);
      current = [];
    } else {
      current.push({ char: text[i], index: i });
    }
  }
  words.push(current);
  return words;
}

type CharScrollProps = {
  char: string;
  distance: number;
  scrollYProgress: MotionValue<number>;
  emphasize?: boolean;
};

function CharScroll({ char, distance, scrollYProgress, emphasize }: CharScrollProps) {
  const x = useTransform(scrollYProgress, [0, 1], [distance * 1.7, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [distance === 0 ? 0 : distance > 0 ? 28 : -28, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);

  return (
    <motion.span className={cn("inline-block", emphasize && "text-primary")} style={{ x, rotateX, opacity }}>
      {char}
    </motion.span>
  );
}

function charVariants(distance: number): Variants {
  return {
    hidden: { opacity: 0, x: distance, rotateX: distance === 0 ? 0 : distance > 0 ? 30 : -30 },
    visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.55, ease: EASE } },
  };
}

export function ConvergeText({
  text,
  className,
  style,
  trigger = "scroll",
  startDelay = 0,
  emphasizeWords,
  scrollOffset = ["start 0.92", "start 0.35"],
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  trigger?: "scroll" | "mount";
  startDelay?: number;
  emphasizeWords?: number;
  scrollOffset?: UseScrollOptions["offset"];
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: scrollOffset });

  const centerIndex = Math.floor(text.length / 2);
  const words = splitWords(text);

  if (trigger === "mount") {
    return (
      <motion.span
        ref={ref}
        className={cn("block", className)}
        style={{ perspective: 500, ...style }}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.016, delayChildren: startDelay } } }}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.map(({ char, index }) => {
              const distance = (index - centerIndex) * 14;
              const emphasize = emphasizeWords !== undefined && text.slice(0, index).split(" ").length - 1 < emphasizeWords;
              return (
                <motion.span
                  key={index}
                  variants={charVariants(distance)}
                  className={cn("inline-block", emphasize && "text-primary")}
                >
                  {char}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={cn("block", className)} style={{ perspective: 500, ...style }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.map(({ char, index }) => {
            const distance = (index - centerIndex) * 14;
            const emphasize = emphasizeWords !== undefined && text.slice(0, index).split(" ").length - 1 < emphasizeWords;
            return (
              <CharScroll key={index} char={char} distance={distance} scrollYProgress={scrollYProgress} emphasize={emphasize} />
            );
          })}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
