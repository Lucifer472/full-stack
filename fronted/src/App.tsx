import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/Sections";

import "@/global.css";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Router />
    </BrowserRouter>
  );
}

export default App;
