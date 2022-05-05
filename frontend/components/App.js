import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import Show from "./show";
import Error from "./error";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:cityId" component={Show} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};

export default App;
