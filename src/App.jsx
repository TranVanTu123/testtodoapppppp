import { useState } from "react";
import Signup from "./containers/signScreen/Signup";
import Signin from "./containers/signScreen/Signin";
import Home from "./containers/homescreen/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [count, setCount] = useState();

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
