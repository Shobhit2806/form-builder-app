import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FormBuilder from "./pages/FormBuilder";
import FormRender from "./pages/FormRender";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form-builder/:formId" element={<FormBuilder />} />
          <Route path="/form-render/:formId" element={<FormRender />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
