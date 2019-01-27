// @flow
import React from "react";
import Moment from "moment";
import * as S from "./styles";

class Timer extends React.Component {
  state = {
    timerValueInSeconds: 120
  };

  componentDidMount() {
    this.onGameStarted();
  }

  onGameStarted = () => {
    const { onGameEnded } = this.props;
    this.timer = setInterval(() => {
      const { timerValueInSeconds } = this.state;
      if (timerValueInSeconds === 0) {
        onGameEnded();
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
      this.setState({ timerValueInSeconds: timerValueInSeconds - 1 });
    }, 1000);
  };

  timer: any;

  render() {
    const { timerValueInSeconds } = this.state;
    const { gameEnded } = this.props;
    return (
      <S.TimerWrap>
        <S.TimerText gameEnded={gameEnded}>
          {gameEnded
            ? "Game Finished"
            : Moment.utc(timerValueInSeconds * 1000).format("mm:ss")}
        </S.TimerText>
      </S.TimerWrap>
    );
  }
}

export default Timer;
