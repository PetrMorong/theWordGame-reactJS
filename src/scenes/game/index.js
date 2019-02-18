import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "moment";

import _get from "lodash/get";
import TopRow from "./topRow";
import LetterChoosing from "./letterChoosing";
import Midle from "./midle";
import Settings from "./settings";
import {
  dbRefUpdated,
  getUserObject,
  amIPlayerOneFunc,
  getOpponentWords,
  getOpponentFinished,
  countPoints,
  isGameRefSet
} from "../../utils";
import { WORD_LIST_EN, WORD_LIST_CZ, WORD_LIST_GERMAN } from "../../constants";
import routes from "../../constants/routes";
import { SET_GAME_ROOM_DATABASE_REF } from "../../redux/reducer";
import * as S from "./styles";
import { roundTime } from "./timer";

const FBInstant = window.FBInstant;

const mapStateToProps = state => state;

const wordsAlises = {
  cz: "czechhWords",
  en: "englishWords",
  german: "germanWords"
};

const wordListsUrls = {
  cz: WORD_LIST_CZ,
  en: WORD_LIST_EN,
  german: WORD_LIST_GERMAN
};

class Game extends Component {
  state = {
    opponentDidNotFinish: false,
    gameRoomState: false,
    gameStarted: false,
    gameEnded: false,
    newWords: false,
    validWords: [],
    words: {
      cz: [],
      en: [],
      german: []
    }
  };

  user = getUserObject(FBInstant);

  componentDidMount() {
    const { gameRoomDatabaseRef, params } = this.props;
    if (params.playerOne || _get(params, "joinedByInvite")) {
      this.getGameRoomState(gameRoomDatabaseRef);
    }
  }

  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef, params } = this.props;
    if (
      dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef) &&
      params.playerTwo
    ) {
      this.getGameRoomState(gameRoomDatabaseRef);
    }
  }

  getGameRoomState = gameRoomDatabaseRef => {
    if (isGameRefSet(gameRoomDatabaseRef)) {
      gameRoomDatabaseRef.onSnapshot(doc => {
        const data = doc.data();
        this.getWordVocabulary(data.language);
        this.setState({ gameRoomState: data });
      });
    }
  };

  getWordVocabulary = async (language: string) => {
    const lang = wordsAlises[language];
    const wordInCache = localStorage.getItem(lang);
    if (wordInCache) {
      this.setWords(language, JSON.parse(wordInCache));
      return;
    }
    const apiCall = await axios.get(wordListsUrls[language]);
    this.setWords(language, apiCall.data);
    localStorage.setItem(lang, JSON.stringify(apiCall.data));
  };

  setWords = (language, wordsFromApi) => {
    const { words } = this.state;
    const newWords = {
      ...words,
      [language]: wordsFromApi
    };
    this.setState({ words: newWords });
  };

  onGameEnded = () => {
    const { gameRoomDatabaseRef } = this.props;
    const { validWords, gameRoomState } = this.state;
    const amIPlayerOne = gameRoomState.playerOne.uid === this.user.uid;
    const data = {};
    if (amIPlayerOne) data.roundOnePlayerOneWords = validWords;
    if (!amIPlayerOne) data.roundOnePlayerTwoWords = validWords;
    this.setState({ gameEnded: true });
    gameRoomDatabaseRef.update(data);
    this.intervalForOpponentFinish = setTimeout(() => {
      this.setState({ opponentDidNotFinish: true });
    }, 5000);
  };

  hadleGetNewWords = () => this.setState({ newWords: true });

  setParentState = newState => this.setState({ ...newState });

  handleLeaveTheGame = () => {
    const { gameRoomState } = this.state;
    const { gameRoomDatabaseRef, changeScene } = this.props;
    const amIPlayerOne = amIPlayerOneFunc(this.user, gameRoomState.playerOne);
    let data = {};
    if (amIPlayerOne) data.playerOneLeft = true;
    if (!amIPlayerOne) data.playerTwoLeft = true;
    gameRoomDatabaseRef.update(data);
    this.resetReduxDatabaseRef();
    changeScene(routes.MENU);
  };

  resetReduxDatabaseRef = () => {
    const { dispatch } = this.props;
    dispatch({ type: SET_GAME_ROOM_DATABASE_REF, payload: {} });
  };

  render() {
    const {
      gameRoomState,
      gameStarted,
      gameEnded,
      validWords,
      words,
      newWords,
      opponentDidNotFinish
    } = this.state;
    const { params, gameRoomDatabaseRef, changeScene } = this.props;
    let opponentPoints = 0;
    let myPoints = 0;
    if (!gameRoomState)
      return (
        <S.Container>
          <S.BackgroundOverlay />
        </S.Container>
      );
    const amIPlayerOne = amIPlayerOneFunc(this.user, gameRoomState.playerOne);
    const opponentWords = getOpponentWords(amIPlayerOne, gameRoomState);
    const opponentFinished = getOpponentFinished(amIPlayerOne, gameRoomState);
    const diff = Moment().diff(Moment(gameRoomState.startedAt));
    const timeLeft = roundTime - Math.floor(Moment.duration(diff).asSeconds());
    if (
      (gameEnded || timeLeft + 5 < 0) &&
      (opponentFinished || opponentDidNotFinish)
    ) {
      opponentPoints = countPoints(opponentWords);
      myPoints = countPoints(validWords);
    }
    const iWon = myPoints > opponentPoints;
    const isDraw = myPoints === opponentPoints;
    return (
      <Fragment>
        <S.Container>
          <S.BackgroundOverlay>
            {gameRoomState && Object.keys(gameRoomDatabaseRef).length > 0 && (
              <Fragment>
                <TopRow
                  onGameEnded={this.onGameEnded}
                  gameStarted={gameStarted}
                  gameEnded={gameEnded}
                  gameRoomState={gameRoomState}
                  user={getUserObject(FBInstant)}
                  params={params}
                  amIPlayerOne={amIPlayerOne}
                />
                <Midle
                  validWords={validWords}
                  gameEnded={gameEnded}
                  opponentWords={opponentWords}
                />
                <LetterChoosing
                  opponentPoints={opponentPoints}
                  myPoints={myPoints}
                  iWon={iWon}
                  isDraw={isDraw}
                  opponentFinished={opponentFinished}
                  validWords={validWords}
                  words={words}
                  gameEnded={gameEnded}
                  gameRoomState={gameRoomState}
                  setParentState={this.setParentState}
                  hadleGetNewWords={this.hadleGetNewWords}
                  opponentDidNotFinish={opponentDidNotFinish}
                  gameRoomDatabaseRef={gameRoomDatabaseRef}
                  newWords={newWords}
                  amIPlayerOne={amIPlayerOne}
                  changeScene={changeScene}
                  resetReduxDatabaseRef={this.resetReduxDatabaseRef}
                />
              </Fragment>
            )}
          </S.BackgroundOverlay>
        </S.Container>
        <Settings onLeave={this.handleLeaveTheGame} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Game);
