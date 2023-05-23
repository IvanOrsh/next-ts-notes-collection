import SideMenuItem from "./SideMenuItem";
import { TableOfContentsItem } from "@/interfaces/TableOfContentsItem";

type SideMenuProps = {
  slug: string;
  menuItems: TableOfContentsItem[];
};

const SideMenu = ({ slug, menuItems }: SideMenuProps) => {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-gray-100 p-4">
      <ul className="space-y-2">
        {menuItems.map((menuItem) => (
          <SideMenuItem
            key={menuItem.title}
            anchor={`/notes/${slug}#${menuItem.anchor}`}
            level={menuItem.level}
            title={menuItem.title}
          />
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
