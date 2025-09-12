/**
 * @file src/components/motion/MotionWrapper/MotionWrapper.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Reusable wrapper components for animations (requires motion as peer dependency)
 */
import React from "react";

// Only use if motion/framer-motion is installed
let motion: any = null;
try {
  motion = require("motion/react");
} catch {
  // Motion not installed
}

export interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionDiv: React.FC<MotionWrapperProps> = ({
  children,
  className,
  delay = 0,
}) => {
  if (!motion) {
    return <div className={className}>{children}</div>;
  }

  const { motion: m } = motion;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </m.div>
  );
};

export const MotionSection: React.FC<MotionWrapperProps> = ({
  children,
  className,
}) => {
  if (!motion) {
    return <section className={className}>{children}</section>;
  }

  const { motion: m } = motion;

  return (
    <m.section
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </m.section>
  );
};
