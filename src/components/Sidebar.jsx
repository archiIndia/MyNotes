import { NotebookPen, Star, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Link
        to={"/notes"}
        label="All notes"
        leftSection={<NotebookPen className={"text-blue-500"} size="1rem" />}
      >
        All Notes
      </Link>
      <Link
        to={"/tags"}
        label="Tags"
        leftSection={<Tag className={"text-blue-500"} size="1rem" />}
      >Tags</Link>
      <Link
        to={"/favourites"}
        label="Favorites"
        leftSection={<Star className={"text-blue-500"} size="1rem" />}
      >Link</Link>
    </>
  );
};
export default Sidebar;
