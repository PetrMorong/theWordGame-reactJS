// @flow
import React from "react";
import Moment from "moment";
import { connect } from "react-redux";
import * as S from "./styles";
import { Howl } from "howler";

export const roundTime = 120;

const mapStateToProps = state => state;

window.whistleSound = new Howl({
  src:
    "https://cdn.fbsbx.com/v/t59.3654-21/50414610_598338747278678_762637495706845184_n.mp4/audioclip-1550411197-960.mp4?_nc_cat=101&_nc_ht=cdn.fbsbx.com&oh=925c33a3b418c04f4da958f851e30680&oe=5C6B4EFC&dl=1&fbclid=IwAR2TueM7I6-cOoIAf4SZHMkhYikOMoIyuBiBjfQuQJZlB71kBYwaOkF0DCE"
});

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
    window.whistleSound.play();
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
