import React, { Component } from "react";
import Timer from "./timer";
import _get from "lodash/get";
import * as S from "./styles";

class TopRow extends Component {
  render() {
    const {
      gameRoomState,
      user,
      gameEnded,
      onGameEnded,
      params,
      amIPlayerOne
    } = this.props;
    const { playerTwo, playerOne } = gameRoomState;
    return (
      <S.TopRow>
        <S.PlayerInfoWrap>
          <S.PlayerPhoto src={user.photoURL} />
          <S.PlayerStats>
            <S.PlayerName>{user.displayName}</S.PlayerName>
          </S.PlayerStats>
        </S.PlayerInfoWrap>
        {_get(gameRoomState, "startedAt") && (
          <Timer
            gameRoomState={gameRoomState}
            gameEnded={gameEnded}
            onGameEnded={onGameEnded}
            params={params}
            amIPlayerOne={amIPlayerOne}
          />
        )}
        <S.PlayerInfoWrap>
          <S.PlayerName>
            {amIPlayerOne ? playerTwo.displayName : playerOne.displayName}
          </S.PlayerName>
          <S.PlayerPhoto
            opponent
            src={amIPlayerOne ? playerTwo.photoURL : playerOne.photoURL}
          />
        </S.PlayerInfoWrap>
      </S.TopRow>
    );
  }
}

export default TopRow;
