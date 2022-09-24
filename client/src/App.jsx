import { Provider } from "react-redux";
import { store } from "./store/index.jsx";
import NotFound from "./pages/NotFoud";
import CrudApi from "./pages/CrudApi";
import {
  Routes, BrowserRouter, Route
} from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<CrudApi/>} />
          <Route exact path="/home/room" element={<Room/>} />
          <Route element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
