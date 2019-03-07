import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";

import BackIcon from "@material-ui/icons/ArrowBackIos";

import routes from "../../constants/routes";
import { dbRefUpdated, isGameRefSet } from "../../utils";
import {
  preloadAdRedux,
  SET_GAME_ROOM_DATABASE_REF
} from "../../redux/reducer";
import * as S from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const mapStateToProps = state => state;

const sliderSettings = {
  showThumbs: false,
  showStatus: false,
  showIndicators: false,
  infiniteLoop: true
};

const languages = {
  CZ: "cz",
  EN: "en"
};

const sliderItems = [
  {
    imageSrc:
      "http://icons.iconarchive.com/icons/wikipedia/flags/256/GB-ENG-England-Flag-icon.png",
    name: "England",
    codeName: languages.EN,
    leagueItems: [
      {
        imageSrc:
          "https://www.barrshill.coventry.sch.uk/wp-content/uploads/2018/05/premier-league-logo-preview.png",
        codeName: "cz_HET",
        height: 170
      }
    ]
  },
  {
    imageSrc:
      "https://scontent-frx5-1.xx.fbcdn.net/v/t1.15752-9/51359052_769415480081198_2020457984471072768_n.png?_nc_cat=101&_nc_ht=scontent-frx5-1.xx&oh=94bb0d3dbb717877e67c260164865b6c&oe=5CEE1F4A",
    name: "Czech republic",
    codeName: languages.CZ,
    leagueItems: [
      {
        imageSrc:
          "https://scontent.fprg1-1.fna.fbcdn.net/v/t1.15752-9/52510801_349238379265779_6902941884184788992_n.png?_nc_cat=107&_nc_ht=scontent.fprg1-1.fna&oh=6626c7a5185df3623586cb83fc4558be&oe=5CEC100B",
        codeName: "en_EPL",
        height: 70
      }
    ]
  }
];

class WaitingForOponent extends Component {
  preloadedInterstitial = null;

  state = {
    choosenLanguage: sliderItems[0]
  };

  componentDidMount() {
    this.showAd();
  }

  showAd = async () => {
    const { preloadedInterstitial, dispatch } = this.props;
    if (preloadedInterstitial) {
      await preloadedInterstitial.showAsync();
      dispatch(preloadAdRedux());
    }
  };

  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef, changeScene } = this.props;
    if (
      dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef) &&
      isGameRefSet(gameRoomDatabaseRef)
    ) {
      gameRoomDatabaseRef.onSnapshot(doc => {
        const data = doc.data();
        if (data.isFull && !data.playerOneLeft && !data.playerTwoLeft) {
          changeScene(routes.GAME, { playerOne: true, playerTwo: false });
        }
      });
    }
  }

  handleBack = async () => {
    const { gameRoomDatabaseRef, changeScene, dispatch } = this.props;
    changeScene(routes.MENU);
    dispatch({ type: SET_GAME_ROOM_DATABASE_REF, payload: {} });
    await gameRoomDatabaseRef.update({
      leftInWaitingRoom: true
    });
  };

  handleChangeCountry = index => {
    this.setState({ choosenLanguage: sliderItems[index] });
  };

  handleStartMatch = () => {
    //TODO save users money to the DB
    //if (money === 0) {
    //TODO open modal
    //}
  };

  render() {
    const { waitingForAFriend } = this.props.params;
    //const { choosenLanguage } = this.state;
    return (
      <S.Container>
        <S.BackgroundOverlay>
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
          {/*
            <S.LeagueChoosingContainer>
              <S.CountyContainer>
                <Carousel {...sliderSettings} onChange={this.handleChangeCountry}>
                  {sliderItems.map(item => (
                    <S.CountySliderItem key={item.codeName}>
                      <S.Flag src={item.imageSrc} />
                      <S.CountryName>{item.name}</S.CountryName>
                    </S.CountySliderItem>
                  ))}
                </Carousel>
              </S.CountyContainer>

              <S.LeagueContainer>
                <Carousel {...sliderSettings}>
                  {choosenLanguage.leagueItems.map(item => (
                    <S.CountySliderItem key={item.imageSrc}>
                      <S.LeagueImage height={item.height} src={item.imageSrc} />
                    </S.CountySliderItem>
                  ))}
                </Carousel>
              </S.LeagueContainer>
              <S.MoneyContainer>
                <span>Match fee</span>
                <S.MoneyIconWrap>
                  <p>200</p>
                  <S.MoneyIcon src="https://t5.rbxcdn.com/01e25c33e4b6656b627eec18fba26844" />
                </S.MoneyIconWrap>
              </S.MoneyContainer>
              <S.AccountBalance>
                <S.MoneyIconWrap>
                  <p>0</p>
                  <S.MoneyIcon src="https://t5.rbxcdn.com/01e25c33e4b6656b627eec18fba26844" />
                </S.MoneyIconWrap>
              </S.AccountBalance>
              <S.PLayButtonContainer>
                <Button
                  style={S.PlayButton}
                  onCl
                  variant="contained"
                  onClick={this.hanleStartMatch}
                >
                  Start the match
                </Button>
              </S.PLayButtonContainer>
            </S.LeagueChoosingContainer>
            */}

          <S.Text>
            {waitingForAFriend
              ? "You invited a friend, when he joins the game will start"
              : "Finding a worthy opponent"}
          </S.Text>
        </S.BackgroundOverlay>
      </S.Container>
    );
  }
}

export default connect(mapStateToProps)(WaitingForOponent);
