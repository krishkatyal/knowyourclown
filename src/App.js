import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { WebcamStreamCapture } from "./components/Video";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/video" element={<WebcamStreamCapture />} />
      </Routes>
    </>
  );
}

export default App;
