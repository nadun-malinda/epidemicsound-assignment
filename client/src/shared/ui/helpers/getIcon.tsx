import { ReactElement } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PlaylistRemoveOutlinedIcon from "@mui/icons-material/PlaylistRemoveOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

export type Icon =
  | "add"
  | "edit"
  | "back"
  | "close"
  | "delete"
  | "playListAdd"
  | "playListPlay"
  | "arrowForward"
  | "playListRemove"
  | "playListAddCheck";

/**
 * Returns a Material UI icon component based on the icon string provided.
 *
 * @param {Icon} icon - The name of the icon to retrieve.
 * @returns {ReactElement} The corresponding Material UI icon component.
 */
export function getIcon(icon: Icon): ReactElement {
  const iconMap: Record<Icon, ReactElement> = {
    add: <AddIcon />,
    close: <CloseIcon />,
    edit: <EditOutlinedIcon />,
    back: <ArrowBackIosIcon />,
    playListAdd: <PlaylistAddIcon />,
    delete: <DeleteOutlineOutlinedIcon />,
    playListPlay: <PlaylistPlayOutlinedIcon />,
    arrowForward: <ArrowForwardOutlinedIcon />,
    playListRemove: <PlaylistRemoveOutlinedIcon />,
    playListAddCheck: <PlaylistAddCheckOutlinedIcon />,
  };

  return iconMap[icon] || <PlusOneIcon />;
}
