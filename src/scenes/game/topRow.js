import React, { Component } from "react";
import Timer from "./timer";
import * as S from "./styles";

class TopRow extends Component {
  render() {
    const {
      gameRoomState,
      user,
      gameEnded,
      onGameEnded,
      location,
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
        <Timer
          gameRoomState={gameRoomState}
          gameEnded={gameEnded}
          onGameEnded={onGameEnded}
          location={location}
          amIPlayerOne={amIPlayerOne}
        />
        <S.PlayerInfoWrap>
          <S.PlayerName>
            {amIPlayerOne ? playerTwo.displayName : playerOne.displayName}
          </S.PlayerName>
          <S.PlayerPhoto
            opponent
            source={amIPlayerOne ? playerTwo.photoURL : playerOne.photoURL}
          />
        </S.PlayerInfoWrap>
      </S.TopRow>
    );
  }
}

export default TopRow;
