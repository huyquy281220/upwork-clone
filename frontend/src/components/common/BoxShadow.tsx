import clsx from "clsx";

interface BoxShadowProps {
  withArrow?: boolean;
  children: React.ReactNode;
  direction?: "left" | "right";
  classNames?: string;
}

export default function BoxShadow({
  withArrow = true,
  // direction = "left",
  children,
  classNames,
}: BoxShadowProps) {
  if (!withArrow) {
    return <div className={clsx("shadow-menu", classNames)}>{children}</div>;
  }

  return (
    <div
      className={clsx(
        "shadow-menu bg-background",
        // direction === "left" ? "arrow-up-left" : "arrow-up-right",
        classNames
      )}
    >
      {children}
    </div>
  );
}
