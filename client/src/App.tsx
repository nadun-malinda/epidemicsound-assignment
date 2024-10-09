import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { TracksPage } from "./components/tracks";
import { PlayListsPage } from "./components/playlists";
import { PlayListPage } from "./components/playlist";

function App() {
  return (
    <main className={styles.app}>
      <NavBar />
      <Routes>
        <Route path="/" element={<TracksPage />} />
        <Route path="/playlists" element={<PlayListsPage />} />
        <Route path="/playlists/:id" element={<PlayListPage />} />
      </Routes>
    </main>
  );
}

export default App;
