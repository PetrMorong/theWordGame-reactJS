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

const store = createStore(Reducer, applyMiddleware(thunk));

const FBInstant = window.FBInstant;

window.gameSound = new Howl({
  src:
    "https://cdn.fbsbx.com/v/t59.3654-21/50346163_2462301250465505_2730688757383561216_n.mp4/audioclip-1550410955-18562.mp4?_nc_cat=102&_nc_ht=cdn.fbsbx.com&oh=b5e79f4a663ac1b30796b96412117536&oe=5C6C80A8&dl=1&fbclid=IwAR3rYyLjJ0P2F4WBSjNO_vdJd8s-B_-EKFya74btxNE2cpdu41MC3CLmhFY",
  loop: true
});

FBInstant.initializeAsync()
  .then(function() {
    FBInstant.setLoadingProgress(50);
    window.gameSound.once("load", function() {
      window.gameSound.play();
      FBInstant.setLoadingProgress(100);
      FBInstant.startGameAsync().then(function() {
        ReactDOM.render(
          <Provider store={store}>
            <CustomRouter />
          </Provider>,
          document.getElementById("root")
        );
      });
    });
  })
  .catch(function(error) {
    console.log(error.message);
  });

class CustomRouter extends React.Component {
  state = {
    scene: routes.WAITING_FOR_OPONENT,
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
