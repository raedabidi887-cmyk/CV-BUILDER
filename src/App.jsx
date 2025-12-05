import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Examples from "./pages/Examples";
import LetterBuilder from "./pages/LetterBuilder";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";





export default function App() {
  return (
    
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/letter" element={<LetterBuilder />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:templateId" element={<Editor />} />

          </Routes>
        </div>

        <Footer />
      </div>
    
  );
}
