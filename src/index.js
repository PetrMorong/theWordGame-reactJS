import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import routes from "./constants/routes";
import Menu from "./scenes/menu";
import Game from "./scenes/game";
import WaitingForOponent from "./scenes/waitingForOponent";
import * as serviceWorker from "./serviceWorker";
import Reducer from "./redux/reducer";

const store = createStore(Reducer, applyMiddleware(thunk));

const FBInstant = window.FBInstant;

FBInstant.initializeAsync()
  .then(function() {
    FBInstant.setLoadingProgress(100);
    FBInstant.startGameAsync().then(function() {
      ReactDOM.render(
        <Provider store={store}>
          <CustomRouter />
        </Provider>,
        document.getElementById("root")
      );
    });
  })
  .catch(function(error) {
    console.log(error.message);
  });

class CustomRouter extends React.Component {
  state = {
    scene: routes.MENU,
    params: { prevScene: false }
  };

  changeScene = (scene, params = {}) => {
    const prevScene = this.state.scene;
    this.setState({ scene, params: { ...params, prevScene } });
  };

  render() {
    const { scene, params } = this.state;
    return (
      <Fragment>
        {scene === routes.MENU && (
          <Menu changeScene={this.changeScene} params={params} />
        )}
        {scene === routes.GAME && (
          <Game changeScene={this.changeScene} params={params} />
        )}
        {scene === routes.WAITING_FOR_OPONENT && (
          <WaitingForOponent changeScene={this.changeScene} params={params} />
        )}
      </Fragment>
    );
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
