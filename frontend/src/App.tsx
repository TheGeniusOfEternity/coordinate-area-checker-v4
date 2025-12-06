import { BrowserRouter, Route, Routes } from "react-router";
import Welcome from "./pages/Welcome.tsx";

const App = ()=> {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/static/" element={<Welcome />}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
