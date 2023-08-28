import styles from "./Toggle.module.css";

import { CircleIcon } from "@/components/icons";
import { ChangeEvent, FC, MouseEvent, useEffect, useId, useState } from "react";

type ToggleProps = {
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  hideLabel?: boolean;
  Icon?: FC<React.SVGProps<SVGSVGElement>>;
  IconProps?: Record<string, unknown>;
};

export const Toggle: FC<ToggleProps> = ({
  isActive: readonlyIsActive = true,
  onToggle,
  Icon = CircleIcon,
  IconProps = {
    className: styles.icon,
  },
  hideLabel = false,
}) => {
  const toggleId = useId();
  const [isActive, setIsActive] = useState(readonlyIsActive);
  const activeStyle = isActive ? styles.active : styles.inactive;
  const { className: iconClassName, ...restIconProps } = IconProps;

  const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
    setIsActive(!isActive);
    onToggle?.(!isActive);
  };

  const handleToggle = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setIsActive(checked);
    onToggle?.(checked);
  };

  return (
    <div>
      <div
        className={`${styles.customToggleWrapper} ${activeStyle}`}
        onClick={handleClick}
      >
        <Icon
          {...{
            className: [styles.icon, iconClassName].join(" "),
            ...restIconProps,
          }}
        />
      </div>
      <input
        type="checkbox"
        className={styles.visuallyHidden}
        id={toggleId}
        checked={isActive}
        onChange={handleToggle}
      />
      {!hideLabel && (
        <label htmlFor={toggleId} className={`${styles.label} ${activeStyle}`}>
          {isActive ? "Allowed" : "Blocked"}
        </label>
      )}
    </div>
  );
};
