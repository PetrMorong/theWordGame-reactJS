// @flow
import React from "react";
import Moment from "moment";
import { connect } from "react-redux";
import _get from "lodash/get";
import * as S from "./styles";

const roundTime = 120;

const mapStateToProps = state => state;

class Timer extends React.Component {
  state = {
    timerValueInSeconds: roundTime
  };

  componentDidMount() {
    this.onGameStarted();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  onGameStarted = () => {
    const { onGameEnded, gameRoomState } = this.props;
    this.timer = setInterval(() => {
      const diff = Moment().diff(Moment(gameRoomState.startedAt));
      const timeLeft =
        roundTime - Math.floor(Moment.duration(diff).asSeconds());
      if (timeLeft === 0) {
        onGameEnded();
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
      this.setState({ timerValueInSeconds: timeLeft });
    }, 1000);
  };

  render() {
    const { timerValueInSeconds } = this.state;
    let { gameEnded } = this.props;
    const {
      gameRoomState: { playerOnePoints, playerTwoPoints },
      gameRoomState,
      amIPlayerOne
    } = this.props;
    const last10sec = timerValueInSeconds <= 10;
    const myPoints = amIPlayerOne ? playerOnePoints : playerTwoPoints;
    const opponentPoints = !amIPlayerOne ? playerOnePoints : playerTwoPoints;
    const someoneLeftTheGame =
      gameRoomState.playerOneLeft || gameRoomState.playerTwoLeft;
    if (someoneLeftTheGame) gameEnded = true;
    return (
      <S.TimerWrap>
        <S.PlayerPoints>
          {myPoints} - {opponentPoints}
        </S.PlayerPoints>

        <S.TimerText
          last10sec={gameEnded ? false : last10sec}
          gameEnded={gameEnded}
        >
          {gameEnded
            ? "Game Finished"
            : Moment.utc(timerValueInSeconds * 1000).format("mm:ss")}
        </S.TimerText>
      </S.TimerWrap>
    );
  }
}

export default connect(mapStateToProps)(Timer);
