import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Howl } from "howler";

import routes from "./constants/routes";
import Menu from "./scenes/menu";
import Game from "./scenes/game";
import WaitingForOponent from "./scenes/waitingForOponent";
import * as serviceWorker from "./serviceWorker";
import Reducer from "./redux/reducer";

require("./assets/gameSound.mp4");

const store = createStore(Reducer, applyMiddleware(thunk));

const FBInstant = window.FBInstant;

window.gameSound = new Howl({
  src: "./static/media/gameSound.mp4",
  loop: true
});

FBInstant.initializeAsync()
  .then(function() {
    window.gameSound.once("load", function() {
      window.gameSound.play();
    });
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
