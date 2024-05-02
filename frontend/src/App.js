import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
import ScholarPage from "./pages/scholar-page";
import SignupPage from "./pages/signup";
import DetailsPage from "./pages/profile-view";
import ViewInfoPage from "./pages/view-info";

const App = () => {
  const backendPath = `http://localhost:8000`;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/view-info/:insttId"
          element={<ViewInfoPage backendPath={backendPath} />}
        />
        <Route
          path="/auth/login"
          element={<LoginPage backendPath={backendPath} />}
        />
        <Route
          path="/auth/signup"
          element={<SignupPage backendPath={backendPath} />}
        />
        <Route
          path="/profile-view"
          element={<DetailsPage backendPath={backendPath} />}
        />
        <Route path="/" element={<ScholarPage backendPath={backendPath} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
