import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Breadcrumbs from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import LampsPage from "./pages/LampsPage";
import LampDetailPage from "./pages/LampDetailPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lamps" element={<LampsPage />} />
        <Route path="/lamps/:id" element={<LampDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
