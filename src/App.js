import "./App.css";

import { Route } from "react-router-dom";
import Map from "./pages/Map";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
      <Route path="/admin" component={Admin} />
    </div>
  );
}

export default App;
