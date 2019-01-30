import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import CzFlag from "../../assets/cz-flag.png";
import EnFlag from "../../assets/en-flag.png";
import Button from "@material-ui/core/Button";
import { generateWordsRandomly, getUserObject } from "../../utils";
import routes from "../../constants/routes";
import * as S from "./styles";
import Firebase from "../../firebase";
import splash from "../../assets/splash.png";
import { SET_GAME_ROOM_DATABASE_REF } from "../../redux/reducer";

const FBInstant = window.FBInstant;

class Menu extends Component {
  state = {
    language: "en",
    loading: false
  };

  componentDidMount() {
    this.gameRoomRef = Firebase.firestore().collection("game_room");
  }

  componentWillUnmountMount() {
    this.gameRoomRef = null;
  }

  handleStartGame = () => {
    const { language } = this.state;
    this.setState({ loading: true });
    this.gameRoomRef
      .where("isFull", "==", false)
      .where("language", "==", language)
      .where("waitingForAFriend", "==", false)
      .where("leftInWaitingRoom", "==", false)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          this.createGameRoom();
          return;
        }
        snapshot.forEach(doc => this.joinGameRoom(doc));
      });
  };

  createGameRoom = () => {
    const { history, dispatch } = this.props;
    const { language } = this.state;
    const lettersRoundOne = generateWordsRandomly(language);
    const lettersRoundOneSetTwo = generateWordsRandomly(language);
    this.gameRoomRef
      .add({
        playerOne: getUserObject(FBInstant),
        playerTwo: { displayName: null, photoURL: null, uid: "" },
        isFull: false,
        waitingForAFriend: false,
        leftInWaitingRoom: false,
        playerOnePoints: 0,
        playerTwoPoints: 0,
        lettersRoundOne,
        lettersRoundOneSetTwo,
        language
      })
      .then(gameRoomDatabaseRef => {
        history.push({
          pathname: routes.WAITING_FOR_OPONENT
        });
        dispatch({
          type: SET_GAME_ROOM_DATABASE_REF,
          payload: gameRoomDatabaseRef
        });
        this.setState({ loading: false });
      });
  };

  joinGameRoom = async existingGameRoom => {
    const { history, dispatch } = this.props;
    const { language } = this.state;
    await existingGameRoom.ref.update({
      playerTwo: getUserObject(FBInstant),
      isFull: true,
      startedAt: moment().format()
    });
    history.push({
      pathname: routes.GAME,
      state: { language, playerTwo: true, playerOne: false }
    });
    dispatch({
      type: SET_GAME_ROOM_DATABASE_REF,
      payload: existingGameRoom.ref
    });

    this.setState({ loading: false });
  };

  handleChangeLanguage = language => {
    this.setState({ language });
  };

  handlePlayWithFriend = async () => {
    const chooseAsync = await FBInstant.context.chooseAsync();
    const players = await FBInstant.context.getPlayersAsync();
    const contextPlayers = players.map(player => ({
      uid: player.getID(),
      displayName: player.getName(),
      photoURL: player.getPhoto()
    }));
    const playerToInvite = contextPlayers.find(
      player => player.uid !== FBInstant.player.getID()
    );
    FBInstant.context.createAsync(playerToInvite.uid).then(function() {
      console.log("FBInstant.context.getID()", FBInstant.context.getID());
      // 5544332211
    });
    console.log("playerToInvite", playerToInvite);
    FBInstant.updateAsync({
      action: "CUSTOM",
      cta: "Join The Game",
      image: btoa(splash),
      text: {
        default: "Your friend invited you",
        localizations: {
          en_US: "Your friend invited you"
        }
      },
      template: "GAME_INVITE",
      data: { gameRoomId: "111" },
      strategy: "IMMEDIATE",
      notification: "NO_PUSH"
    }).then(function() {
      // closes the game after the update is posted.
      console.log("here");
    });
  };

  render() {
    const { language, loading } = this.state;
    return (
      <S.Container>
        <S.UserWrap>
          <S.UserImage src={FBInstant.player.getPhoto()} />
          <S.UserName>{FBInstant.player.getName()}</S.UserName>
        </S.UserWrap>
        <Button
          variant="contained"
          disabled={loading}
          style={{
            ...S.PlayButton,
            backgroundColor: loading ? "#CFCFCF" : "#8FB842"
          }}
          onClick={this.handleStartGame}
        >
          Find opponent
        </Button>
        <Button
          size="small"
          variant="text"
          disabled={loading}
          style={S.PlayWithFriendButton}
          onClick={this.handlePlayWithFriend}
        >
          Play with a friend
        </Button>
        <S.LanguagesWrap>
          <S.LanguageButton
            selected={language === "cz"}
            onClick={() => this.handleChangeLanguage("cz")}
          >
            <S.LanguageButtonImage src={CzFlag} />
          </S.LanguageButton>
          <S.LanguageButton
            selected={language === "en"}
            onClick={() => this.handleChangeLanguage("en")}
          >
            <S.LanguageButtonImage src={EnFlag} />
          </S.LanguageButton>
        </S.LanguagesWrap>
      </S.Container>
    );
  }
}

export default connect()(Menu);
