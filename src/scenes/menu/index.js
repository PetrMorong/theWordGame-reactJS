import React, { Component } from "react";
import { connect } from "react-redux";
import CzFlag from "../../assets/cz-flag.png";
import EnFlag from "../../assets/en-flag.png";
import Button from "@material-ui/core/Button";
import { generateWordsRandomly, getUserObject } from "../../utils";
import routes from "../../constants/routes";
import * as S from "./styles";
import Firebase from "../../firebase";
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

  handleStartGame = () => {
    const { language } = this.state;
    this.setState({ loading: true });
    this.gameRoomRef
      .where("isFull", "==", false)
      .where("language", "==", language)
      .where("waitingForAFriend", "==", false)
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
      isFull: true
    });
    history.push({
      pathname: routes.GAME,
      state: { language }
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
          variant="text"
          disabled={loading}
          style={S.PlayWithFriendButton}
          onClick={this.handleShareWithFriend}
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
