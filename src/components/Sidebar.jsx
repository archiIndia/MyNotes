import { NavLink } from "@mantine/core";
import { NotebookPen, Star, Tag } from "lucide-react";

const Sidebar = () => {
  return(
    <>
      <NavLink
        href="#required-for-focus"
        label="All notes"
        leftSection={
          <NotebookPen className={"text-blue-500"} size="1rem" />
        }
      />
      <NavLink
        href="#required-for-focus"
        label="Tags"
        leftSection={<Tag className={"text-blue-500"} size="1rem" />}
      />
      <NavLink
        href="#required-for-focus"
        label="Favorites"
        leftSection={<Star className={"text-blue-500"} size="1rem" />}
      />
    </>
  )
}
export default Sidebar;