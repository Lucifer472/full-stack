import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/Sections";

import "@/global.css";
import ThemeProvider from "./theme";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
