import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/404";
import Report from "./pages/Report";

function App() {
  return (
    <Routes>
      <Route path="/report/:reportId" element={<Report />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
