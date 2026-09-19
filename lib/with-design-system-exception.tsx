import type { ComponentType, CSSProperties } from "react";

type StylingProps = { className?: string; style?: CSSProperties };

export function withDesignSystemException<Props extends StylingProps>(Component: ComponentType<Props>) {
  return function WithDesignSystemException({
    designSystemException,
    ...props
  }: Omit<Props, keyof StylingProps> & {
    designSystemException?: StylingProps & { reason: string };
  }) {
    return (
      <Component
        {...(props as Props)}
        className={designSystemException?.className}
        style={designSystemException?.style}
      />
    );
  };
}
