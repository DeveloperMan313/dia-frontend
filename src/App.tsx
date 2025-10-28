import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Breadcrumbs from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import LampsPage from "./pages/LampsPage";
import LampDetailPage from "./pages/LampDetailPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Container className="mt-3">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lamps" element={<LampsPage />} />
          <Route path="/lamps/:id" element={<LampDetailPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
