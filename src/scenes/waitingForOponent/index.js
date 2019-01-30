import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import BackIcon from "@material-ui/icons/ArrowBackIos";

import routes from "../../constants/routes";
import { dbRefUpdated, isGameRefSet } from "../../utils";
import * as S from "./styles";

const mapStateToProps = state => state;

class WaitingForOponent extends Component {
  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef, history } = this.props;
    if (
      dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef) &&
      isGameRefSet(gameRoomDatabaseRef)
    ) {
      gameRoomDatabaseRef.onSnapshot(doc => {
        const data = doc.data();
        if (data.isFull && !data.playerOneLeft && !data.playerTwoLeft) {
          history.push({
            pathname: routes.GAME,
            state: { playerOne: true, playerTwo: false }
          });
        }
      });
    }
  }

  handleBack = async () => {
    const { gameRoomDatabaseRef, history } = this.props;
    history.push({ pathname: routes.MENU });
    await gameRoomDatabaseRef.update({
      leftInWaitingRoom: true
    });
  };

  render() {
    const { waitingForAFriend } = this.props.location;
    return (
      <S.Container>
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
            ? "Share a link with you friend and wait until he joins"
            : "Finding a worthy opponent"}
        </S.Text>
        {waitingForAFriend && (
          <Button
            mode="text"
            onClick={this.handleShareWithFriend}
            text="Send link to your friend"
          />
        )}
      </S.Container>
    );
  }
}

export default connect(mapStateToProps)(WaitingForOponent);
