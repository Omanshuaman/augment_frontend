import "./App.css";

import { Route } from "react-router-dom";
import Map from "./pages/Map";
import View from "./pages/View";
import Edit from "./pages/Edit";
import Admin from "./pages/Admin";
import Pagination from "./pages/Pagination";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Map} />
      <Route exact path="/view/:id" component={View} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/pagination" component={Pagination} />
    </div>
  );
}

export default App;
