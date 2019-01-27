import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Preload from "./scenes/preload";
import Menu from "./scenes/menu";
import Game from "./scenes/game";
import WaitingForOponent from "./scenes/waitingForOponent";
import * as serviceWorker from "./serviceWorker";
import Reducer from "./redux/reducer";

const store = createStore(Reducer);

window.FBInstant.initializeAsync()
  .then(function() {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Preload} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/game" component={Game} />
            <Route
              exact
              path="/WaitingForOponent"
              component={WaitingForOponent}
            />
          </Switch>
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    );
  })
  .catch(function(error) {
    console.log(error.message);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
