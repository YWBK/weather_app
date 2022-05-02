import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./home";
import Error from "./error";


const App = () => {
  const [err, setErr] = React.useState(false);

  const location = useLocation();

  useEffect(location => {
    // debugger;
  })

  // if location includes includes anything not accepted, setErr to true

  return ( // err ? render error component : render the switch
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Error} />
      </Switch>
    </div>
  )
}

export default App;