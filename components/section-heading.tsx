import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
};

export function SectionHeading({ eyebrow, title, aside }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {aside ? <div className="section-aside">{aside}</div> : null}
    </header>
  );
}
