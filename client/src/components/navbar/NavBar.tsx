import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "@/assets/logo.svg";

export function NavBar() {
  return (
    <nav>
      <img src={logo} className={styles.logo} alt="Logo" />
      <ul className={styles.menu}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Tracks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/playlists"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Playlists
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
