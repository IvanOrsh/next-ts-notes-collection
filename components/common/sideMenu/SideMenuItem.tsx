import Link from "next/link";

import classNames from "classnames";

type SideMenuItemProps = {
  title: string;
  anchor: string;
  level: number;
};

const SideMenuItem = ({ title, anchor, level }: SideMenuItemProps) => {
  const itemClasses = classNames(
    "block border-b py-2",
    {
      "font-bold text-2xl": level === 1,
      "font-medium text-lg": level === 2,
      "text-base": level === 3,
    },
    "hover:text-blue-500"
  );

  return (
    <li>
      <Link href={anchor} className={itemClasses}>
        {title}
      </Link>
    </li>
  );
};

export default SideMenuItem;
