"use client";

import { motion, useScroll, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function ScrollStagger({
  children,
  className,
  role,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  role?: string;
  "aria-label"?: string;
}) {
  return (
    <motion.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
  role,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  role?: string;
  "aria-label"?: string;
}) {
  return (
    <motion.div className={className} role={role} aria-label={ariaLabel} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Thin fixed bar at the very top that fills as the whole page is scrolled. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <motion.div className="h-full bg-primary origin-left" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
