import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import BackIcon from "@material-ui/icons/ArrowBackIos";

import routes from "../../constants/routes";
import { dbRefUpdated, isGameRefSet } from "../../utils";
import {
  preloadAdRedux,
  SET_GAME_ROOM_DATABASE_REF
} from "../../redux/reducer";
import * as S from "./styles";

const mapStateToProps = state => state;

class WaitingForOponent extends Component {
  preloadedInterstitial = null;

  componentDidMount() {
    this.showAd();
  }

  showAd = async () => {
    const { preloadedInterstitial, dispatch } = this.props;
    if (preloadedInterstitial) {
      await preloadedInterstitial.showAsync();
      dispatch(preloadAdRedux());
    }
  };

  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef, changeScene } = this.props;
    if (
      dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef) &&
      isGameRefSet(gameRoomDatabaseRef)
    ) {
      gameRoomDatabaseRef.onSnapshot(doc => {
        const data = doc.data();
        if (data.isFull && !data.playerOneLeft && !data.playerTwoLeft) {
          changeScene(routes.GAME, { playerOne: true, playerTwo: false });
        }
      });
    }
  }

  handleBack = async () => {
    const { gameRoomDatabaseRef, changeScene, dispatch } = this.props;
    changeScene(routes.MENU);
    dispatch({ type: SET_GAME_ROOM_DATABASE_REF, payload: {} });
    await gameRoomDatabaseRef.update({
      leftInWaitingRoom: true
    });
  };

  render() {
    const { waitingForAFriend } = this.props.params;
    return (
      <S.Container>
        <S.BackgroundOverlay>
          <S.BackWrap>
            <Button
              onClick={this.handleBack}
              variant="text"
              style={{ color: "white" }}
            >
              <BackIcon size={17} />
              Cancel
            </Button>
          </S.BackWrap>
          <S.Text>
            {waitingForAFriend
              ? "You invited a friend, when he joins the game will start"
              : "Finding a worthy opponent"}
          </S.Text>
        </S.BackgroundOverlay>
      </S.Container>
    );
  }
}

export default connect(mapStateToProps)(WaitingForOponent);
