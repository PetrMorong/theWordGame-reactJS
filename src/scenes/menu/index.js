import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { generateWordsRandomly, getUserObject } from "../../utils";
import routes from "../../constants/routes";
import * as S from "./styles";
import Firebase from "../../firebase";
import _partial from "lodash/partial";
import _get from "lodash/get";
import {
  SET_GAME_ROOM_DATABASE_REF,
  preloadAdRedux
} from "../../redux/reducer";
import {
  BASE_64_FOR_SENDING_INVITES,
  FB_AD_TYPE_GAME_STARTED_INTERESTIAL,
  FB_AD_TYPE_GAME_ENDED_INTERESTIAL
} from "../../constants";

const FBInstant = window.FBInstant;

class Menu extends Component {
  state = {
    language: "en",
    loading: false
  };

  componentDidMount() {
    const { params } = this.props;
    this.gameRoomRef = Firebase.firestore().collection("game_room");
    const entryPointData = FBInstant.getEntryPointData();
    if (entryPointData) {
      this.joinGameRoomBaseOnId(entryPointData.gameRoomId);
    }
    if (params.prevScene === routes.GAME) {
      this.showAd();
    } else {
      this.preloadAd();
    }
  }

  componentWillUnmountMount() {
    this.gameRoomRef = null;
  }

  showAd = async () => {
    const { preloadedInterstitial, dispatch } = this.props;
    if (preloadedInterstitial) {
      await preloadedInterstitial.showAsync();
      dispatch(preloadAdRedux(FB_AD_TYPE_GAME_ENDED_INTERESTIAL));
    }
  };

  preloadAd = async () => {
    const { dispatch } = this.props;
    dispatch(preloadAdRedux(FB_AD_TYPE_GAME_STARTED_INTERESTIAL));
  };

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

  createGameRoom = (waitingForAFriend = false) => {
    const { changeScene, dispatch } = this.props;
    const { language } = this.state;
    const lettersRoundOne = generateWordsRandomly(language);
    const lettersRoundOneSetTwo = generateWordsRandomly(language);
    this.gameRoomRef
      .add({
        playerOne: getUserObject(FBInstant),
        playerTwo: { displayName: null, photoURL: null, uid: "" },
        isFull: false,
        waitingForAFriend,
        leftInWaitingRoom: false,
        playerOnePoints: 0,
        playerTwoPoints: 0,
        lettersRoundOne,
        lettersRoundOneSetTwo,
        language
      })
      .then(gameRoomDatabaseRef => {
        if (waitingForAFriend) {
          this.handlePlayWithFriend(gameRoomDatabaseRef.id);
        }
        changeScene(routes.WAITING_FOR_OPONENT, { waitingForAFriend });
        dispatch({
          type: SET_GAME_ROOM_DATABASE_REF,
          payload: gameRoomDatabaseRef
        });
        this.setState({ loading: false });
      });
  };

  joinGameRoom = async existingGameRoom => {
    const { changeScene, dispatch } = this.props;
    const { language } = this.state;
    await existingGameRoom.ref.update({
      playerTwo: getUserObject(FBInstant),
      isFull: true,
      startedAt: moment().format()
    });
    changeScene(routes.GAME, { language, playerTwo: true, playerOne: false });
    dispatch({
      type: SET_GAME_ROOM_DATABASE_REF,
      payload: existingGameRoom.ref
    });

    this.setState({ loading: false });
  };

  handleChangeLanguage = language => {
    this.setState({ language });
  };

  handlePlayWithFriend = async gameRoomId => {
    FBInstant.context.chooseAsync().then(() => {
      FBInstant.updateAsync({
        action: "CUSTOM",
        cta: "Play",
        text: {
          default: "I challenge you in a word battle."
        },
        image: BASE_64_FOR_SENDING_INVITES,
        template: "game_invite",
        data: { gameRoomId },
        strategy: "IMMEDIATE",
        notification: "PUSH"
      })
        .then(() => {
          console.log("Message was sent successfully");
        })
        .catch(err => {
          console.log(err);
        });
    });

    /*
    const players = await FBInstant.context.getPlayersAsync();
    const contextPlayers = players.map(player => ({
      uid: player.getID(),
      displayName: player.getName(),
      photoURL: player.getPhoto()
    }));
    const playerToInvite = contextPlayers.find(
      player => player.uid !== FBInstant.player.getID()
    );
    console.log("playerToInvite");
    FBInstant.context.createAsync(playerToInvite.uid).then(function() {
      console.log("FBInstant.context.getID()", FBInstant.context.getID());
      // 5544332211
    });*/

    /*FBInstant.setSessionData({
      playAgain: true,
      durationInSec: 5
    });
    FBInstant.quit();*/
  };

  joinGameRoomBaseOnId = async (id: string) => {
    const { changeScene, dispatch } = this.props;
    const { language } = this.state;
    Firebase.firestore()
      .collection("game_room")
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();
        if (!_get(data, "startedAt", false)) {
          doc.ref.update({
            playerTwo: getUserObject(FBInstant),
            isFull: true,
            startedAt: moment().format()
          });
          dispatch({
            type: SET_GAME_ROOM_DATABASE_REF,
            payload: doc.ref
          });
          changeScene(routes.GAME, {
            language,
            playerTwo: true,
            playerOne: false,
            joinedByInvite: true
          });
        }
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
          onClick={_partial(this.createGameRoom, true)}
        >
          Play with a friend
        </Button>

        <S.LanguagesWrap>
          <S.LanguageButton
            selected={language === "cz"}
            onClick={() => this.handleChangeLanguage("cz")}
          >
            <S.LanguageButtonImage src="https://scontent-frx5-1.xx.fbcdn.net/v/t1.15752-9/51359052_769415480081198_2020457984471072768_n.png?_nc_cat=101&_nc_ht=scontent-frx5-1.xx&oh=94bb0d3dbb717877e67c260164865b6c&oe=5CEE1F4A" />
          </S.LanguageButton>
          <S.LanguageButton
            selected={language === "en"}
            onClick={() => this.handleChangeLanguage("en")}
          >
            <S.LanguageButtonImage src="https://scontent-frx5-1.xx.fbcdn.net/v/t1.15752-9/51143367_800735913610910_4227225959410958336_n.png?_nc_cat=109&_nc_ht=scontent-frx5-1.xx&oh=b6e4c3c2f4a913b9653d873bc1d36693&oe=5CB465C6" />
          </S.LanguageButton>
          <S.LanguageButton
            selected={language === "german"}
            onClick={() => this.handleChangeLanguage("german")}
          >
            <S.LanguageButtonImage src="https://scontent.fprg1-1.fna.fbcdn.net/v/t1.15752-9/52126748_571784826621671_7645004059887271936_n.png?_nc_cat=103&_nc_ht=scontent.fprg1-1.fna&oh=f95704dca8153632f3812f4245097e1e&oe=5CDFFE72" />
          </S.LanguageButton>
        </S.LanguagesWrap>
      </S.Container>
    );
  }
}

export default connect()(Menu);
