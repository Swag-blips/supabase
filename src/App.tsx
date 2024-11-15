import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
