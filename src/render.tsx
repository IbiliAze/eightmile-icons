import type { ReactElement, SVGProps } from 'react';
import type { Cut } from './cut.js';
import type { IconSource } from './icon.js';
import type { Motion } from './motion.js';

/** The three forms every icon comes in. */
export const SEGMENTS = ['dynamic', 'static', 'cropped'] as const;

export type Segment = (typeof SEGMENTS)[number];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'stroke'> {
  /** Width and height; a number is px. */
  size?: number | string;
  /** The line width in viewBox units (the box is 24). Ignored by a brand mark, which is filled. */
  stroke?: number | string;
  /** The colour of the lines, or of a brand mark's fill. */
  color?: string;
  /** Names the icon to a screen reader. Without it, or an `aria-label`, the icon is hidden from one. */
  title?: string;
}

/** An icon component. Its props match `@tabler/icons-react`'s, plus `title`. */
export type Icon = ((props: IconProps) => ReactElement) & { displayName?: string };

export const pascal = (kebab: string): string =>
  kebab.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

/**
 * One segment of one icon. The drawing is made here, once, when the segment's module loads, and
 * every render reuses it: there is nothing per render to draw, and no hook, so an icon renders in
 * a Server Component as well as a client one.
 */
export const renderIcon = (
  source: IconSource,
  name: string,
  segment: Segment,
  m: Motion,
  cut: Cut,
): Icon => {
  const drawing = source.draw(m, cut);
  const { fill } = source;
  const Component: Icon = ({
    size = 24,
    stroke = 2,
    color = 'currentColor',
    title,
    className,
    children,
    ...rest
  }) => {
    const named =
      title !== undefined ||
      rest['aria-label'] !== undefined ||
      rest['aria-labelledby'] !== undefined;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill ? color : 'none'}
        stroke={fill ? 'none' : color}
        strokeWidth={fill ? undefined : stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ? `emi-icon ${className}` : 'emi-icon'}
        data-icon={name}
        data-segment={segment}
        role={named ? 'img' : undefined}
        aria-hidden={named ? undefined : true}
        {...rest}
      >
        {title !== undefined && <title>{title}</title>}
        {drawing}
        {children}
      </svg>
    );
  };
  Component.displayName = `Icon${pascal(name)}`;
  return Component;
};
