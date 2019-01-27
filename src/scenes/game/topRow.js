import React, { Component } from "react";
import { amIPlayerOneFunc } from "../../utils";
import Timer from "./timer";
import * as S from "./styles";

class TopRow extends Component {
  render() {
    const { gameRoomState, user, gameEnded, onGameEnded } = this.props;
    const { playerTwo, playerOne } = gameRoomState;
    const amIPlayerOne = amIPlayerOneFunc(user, gameRoomState);

    return (
      <S.TopRow>
        <S.PlayerInfoWrap>
          <S.PlayerPhoto src={user.photoURL} />
          <S.PlayerName>{user.displayName}</S.PlayerName>
        </S.PlayerInfoWrap>
        <Timer gameEnded={gameEnded} onGameEnded={onGameEnded} />
        <S.PlayerInfoWrap>
          <S.PlayerName>
            {amIPlayerOne ? playerTwo.displayName : playerOne.displayName}
          </S.PlayerName>
          <S.PlayerPhoto
            source={amIPlayerOne ? playerTwo.photoURL : playerOne.photoURL}
          />
        </S.PlayerInfoWrap>
      </S.TopRow>
    );
  }
}

export default TopRow;
