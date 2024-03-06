import Router from "@/routes/Sections";
import { BrowserRouter } from "react-router-dom";

import "@/global.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
