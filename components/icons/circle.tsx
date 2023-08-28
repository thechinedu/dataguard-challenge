import { FC, SVGProps } from "react";

export const CircleIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg height="1em" viewBox="0 0 512 512" {...props}>
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};
