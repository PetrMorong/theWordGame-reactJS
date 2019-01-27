import React, { Component } from "react";
import * as S from "./styles";
import ImageSrc from "../../assets/splash.png";
const FBInstant = window.FBInstant;

class Preload extends Component {
  componentDidMount() {
    const { history } = this.props;
    FBInstant.setLoadingProgress(100);
    FBInstant.startGameAsync().then(function() {
      history.push("/menu");
    });
  }

  render() {
    return (
      <S.Container>
        <S.Image src={ImageSrc} />
      </S.Container>
    );
  }
}

export default Preload;
