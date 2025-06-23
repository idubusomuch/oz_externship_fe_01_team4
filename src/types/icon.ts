import type { ComponentType, SVGProps } from 'react'

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type IconProps = {
  icon: React.ElementType;
  size?: number | string
  color?: string
  className?: string
  classNameIcon?: string
}
