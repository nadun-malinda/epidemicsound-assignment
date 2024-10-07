import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { TrackList } from "./components/tracks/TrackList";

function App() {
  return (
    <>
      <main className={styles.app}>
        <NavBar />
        <Routes>
          <Route path="/" element={<TrackList />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
