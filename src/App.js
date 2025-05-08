import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Dashboard/component/SideBar";
import SearchScore from "./pages/Dashboard/page/SearchScore";
import Report from "./pages/Dashboard/page/Report";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "1rem" }} className="main-layout">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/score" element={<SearchScore />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
