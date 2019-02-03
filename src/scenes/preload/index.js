import React, { Component } from "react";
import * as S from "./styles";
//import ImageSrc from "../../assets/splash.png";
import routes from "../../constants/routes";

const FBInstant = window.FBInstant;

class Preload extends Component {
  componentDidMount() {
    console.log("ici");
    const { changeScene } = this.props;
  }

  render() {
    return <S.Container>{/*<S.Image src={ImageSrc} />*/}</S.Container>;
  }
}

export default Preload;
