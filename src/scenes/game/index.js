import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import TopRow from "./topRow";
import LetterChoosing from "./letterChoosing";
import Midle from "./midle";
import {
  dbRefUpdated,
  getUserObject,
  amIPlayerOneFunc,
  getOpponentWords,
  getOpponentFinished,
  countPoints
} from "../../utils";
import { WORD_LIST_EN, WORD_LIST_CZ } from "../../constants";

import * as S from "./styles";

const FBInstant = window.FBInstant;

const mapStateToProps = state => state;

const wordsAlises = {
  cz: "czechhWords",
  en: "englishWords"
};

const wordListsUrls = {
  cz: WORD_LIST_CZ,
  en: WORD_LIST_EN
};

class Game extends Component {
  state = {
    gameRoomState: false,
    gameStarted: false,
    gameEnded: false,
    newWords: false,
    validWords: [],
    words: {
      cz: [],
      en: []
    }
  };

  user = getUserObject(FBInstant);

  componentDidMount() {
    const { gameRoomDatabaseRef } = this.props;
    if (Object.keys(gameRoomDatabaseRef).length > 0)
      this.getGameRoomState(gameRoomDatabaseRef);
  }

  componentDidUpdate(prevProps) {
    const { gameRoomDatabaseRef } = this.props;
    if (dbRefUpdated(prevProps.gameRoomDatabaseRef, gameRoomDatabaseRef)) {
      this.getGameRoomState(gameRoomDatabaseRef);
    }
  }

  getGameRoomState = gameRoomDatabaseRef => {
    gameRoomDatabaseRef.onSnapshot(doc => {
      const data = doc.data();
      this.getWordVocabulary(data.language);
      this.setState({ gameRoomState: data });
    });
  };

  getWordVocabulary = async (language: string) => {
    const lang = wordsAlises[language];
    const wordInCache = localStorage.getItem(lang);
    if (wordInCache) {
      this.setWords(language, JSON.parse(wordInCache));
      return;
    }
    const apiCall = await axios.get(wordListsUrls[language]);
    this.setWords(language, JSON.parse(apiCall.data));
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
  };

  hadleGetNewWords = () => this.setState({ newWords: true });

  setParentState = newState => this.setState({ ...newState });

  render() {
    const {
      gameRoomState,
      gameStarted,
      gameEnded,
      validWords,
      words,
      newWords
    } = this.state;
    let opponentPoints = 0;
    let myPoints = 0;
    if (!gameRoomState) return <span>Loader</span>;
    const amIPlayerOne = amIPlayerOneFunc(this.user, gameRoomState.playerOne);
    const opponentWords = getOpponentWords(amIPlayerOne, gameRoomState);
    const opponentFinished = getOpponentFinished(amIPlayerOne, gameRoomState);
    if (gameEnded && opponentFinished) {
      opponentPoints = countPoints(opponentWords);
      myPoints = countPoints(validWords);
    }
    const iWon = myPoints > opponentPoints;
    const isDraw = myPoints === opponentPoints;

    return (
      <S.Container>
        {gameRoomState && (
          <Fragment>
            <TopRow
              onGameEnded={this.onGameEnded}
              gameStarted={gameStarted}
              gameEnded={gameEnded}
              gameRoomState={gameRoomState}
              user={getUserObject(FBInstant)}
            />
            <Midle
              validWords={validWords}
              gameEnded={validWords}
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
              newWords={newWords}
            />
          </Fragment>
        )}
      </S.Container>
    );
  }
}

export default connect(mapStateToProps)(Game);
