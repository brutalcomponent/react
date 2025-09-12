/**
 * @file src/components/core/Button/ButtonGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Group buttons together
 */
import React from "react";
import { clsx } from "clsx";
import { Button } from "./Button";
import type { ButtonGroupProps } from "./types";

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  direction = "horizontal",
  attached = true,
}) => (
  <div
    className={clsx(
      "inline-flex",
      direction === "horizontal"
        ? attached
          ? "-space-x-px"
          : "gap-2"
        : "flex-col",
      direction === "vertical" && (attached ? "-space-y-px" : "gap-2"),
      className,
    )}
  >
    {React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === Button) {
        const childCount = React.Children.count(children);

        if (!attached) return child;

        return React.cloneElement(child, {
          className: clsx(
            child.props.className,
            direction === "horizontal" && [
              index === 0 && "rounded-r-none",
              index === childCount - 1 && "rounded-l-none",
              index !== 0 && index !== childCount - 1 && "rounded-none",
            ],
            direction === "vertical" && [
              index === 0 && "rounded-b-none",
              index === childCount - 1 && "rounded-t-none",
              index !== 0 && index !== childCount - 1 && "rounded-none",
            ],
          ),
        });
      }
      return child;
    })}
  </div>
);
