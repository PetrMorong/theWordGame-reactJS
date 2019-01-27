import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import routes from "../../constants/routes";
import { dbRefUpdated } from "../../utils";
import * as S from "./styles";

const mapStateToProps = state => state;

class WaitingForOponent extends Component {
  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef, history } = this.props;
    if (dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef)) {
      gameRoomDatabaseRef.onSnapshot(doc => {
        if (doc.data().isFull) {
          history.push({ pathname: routes.GAME });
        }
      });
    }
  }

  render() {
    const { waitingForAFriend } = this.props.location;
    return (
      <S.Container>
        <S.Text>
          {waitingForAFriend
            ? "Share a link with you friend and wait until he joins"
            : "Waiting until second player joins"}
        </S.Text>
        {waitingForAFriend && (
          <Button
            mode="contained"
            onClick={this.handleShareWithFriend}
            text="Send link to your friend"
          />
        )}
      </S.Container>
    );
  }
}

export default connect(mapStateToProps)(WaitingForOponent);
