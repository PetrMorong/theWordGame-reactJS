import React, { Component, Fragment } from "react";
import _map from "lodash/map";
import _identity from "lodash/identity";
import _split from "lodash/split";
import _partial from "lodash/partial";
import _debounce from "lodash/debounce";
import CircularProgress from "@material-ui/core/CircularProgress";
import NewLetters from "./newLetters";
import * as S from "./styles";
import {
  validateWord,
  sortValidAndInvalidWors,
  checkIfWordIsAlreadySubmited,
  sortBasedOnLength,
  countPoints
} from "../../utils";

const initialState = {
  handleFinishWatchingAd: false,
  userWatchedAd: false,
  choosenLetters: [],
  clickedLetterIndexes: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
};
class LetterChoosing extends Component {
  state = initialState;

  constructor() {
    super();
    this.handleLetterClick = _debounce(this.handleLetterClick.bind(this), 200);
  }

  handleLetterClick = params => {
    const letterArray = params[0];
    const index = params[1];
    const { choosenLetters, clickedLetterIndexes } = this.state;
    if (clickedLetterIndexes[index]) return;
    const newChosenLetters = [...choosenLetters, letterArray];
    const newClickedLetterIndexes = [...clickedLetterIndexes];
    newClickedLetterIndexes[index] = true;
    this.setState({
      choosenLetters: newChosenLetters,
      clickedLetterIndexes: newClickedLetterIndexes
    });
  };

  handleDeletePress = () => {
    const { choosenLetters, clickedLetterIndexes } = this.state;
    if (choosenLetters.length === 0) return;
    const newChosenLetters = [...choosenLetters];
    const newClickedLetterIndexes = [...clickedLetterIndexes];
    const indexOfDeletedLetter =
      newChosenLetters[newChosenLetters.length - 1][0];
    //$FlowExpectedError
    newClickedLetterIndexes[indexOfDeletedLetter] = false;
    newChosenLetters.splice(-1, 1);
    this.setState({
      choosenLetters: newChosenLetters,
      clickedLetterIndexes: newClickedLetterIndexes
    });
  };

  handleFinishWatchingAd = () => {
    this.setState({ userWatchedAd: true });
  };

  handleSendClick = () => {
    const { choosenLetters } = this.state;
    const {
      validWords,
      words,
      gameRoomState,
      setParentState,
      gameRoomDatabaseRef,
      amIPlayerOne
    } = this.props;
    if (choosenLetters.length === 0) return;
    const word = _map(choosenLetters, item => _identity(item[1])).join();
    const parsedWord = _split(word, ",").join("");
    if (checkIfWordIsAlreadySubmited(validWords, parsedWord)) return;
    const wordIsValid = validateWord(gameRoomState.language, words, parsedWord);
    const newValidWords = [
      ...validWords,
      { text: parsedWord, valid: wordIsValid }
    ];
    let data = {};
    if (amIPlayerOne) data.playerOnePoints = countPoints(newValidWords);
    if (!amIPlayerOne) data.playerTwoPoints = countPoints(newValidWords);
    console.log(data);
    if (wordIsValid) gameRoomDatabaseRef.update({ ...data });
    setParentState({
      validWords: sortBasedOnLength(sortValidAndInvalidWors(newValidWords))
    });
    this.setState({
      choosenLetters: initialState.choosenLetters,
      clickedLetterIndexes: initialState.clickedLetterIndexes
    });
  };

  render() {
    const { choosenLetters, clickedLetterIndexes } = this.state;
    const {
      opponentPoints,
      myPoints,
      newWords,
      gameRoomState,
      iWon,
      isDraw,
      opponentFinished,
      hadleGetNewWords,
      opponentDidNotFinish
    } = this.props;
    let { gameEnded } = this.props;
    const someoneLeftTheGame =
      gameRoomState.playerOneLeft || gameRoomState.playerTwoLeft;
    if (someoneLeftTheGame) gameEnded = true;

    return (
      <Fragment>
        {gameEnded && someoneLeftTheGame && (
          <S.GameEndedStats>
            <S.GameEndedStatsText>
              Your win opponent left the game
            </S.GameEndedStatsText>
          </S.GameEndedStats>
        )}
        {gameEnded && !opponentFinished && !opponentDidNotFinish && (
          <S.GameEndedStats>
            <CircularProgress style={S.spinnerStyle} size={15} />
            <S.GameEndedStatsText>
              Waiting for your opponent
            </S.GameEndedStatsText>
          </S.GameEndedStats>
        )}
        {gameEnded && (opponentFinished || opponentDidNotFinish) && (
          <Fragment>
            <S.ChosenLettersWrap>
              <S.EraseButton gameEnded={gameEnded} onClick={this.goHome}>
                <S.EraseButtonText>GO BACK TO MENU</S.EraseButtonText>
              </S.EraseButton>
            </S.ChosenLettersWrap>
            <S.GameEndedStats>
              <S.GameEndedStatsText>
                {isDraw
                  ? `It is draw. Your both had ${myPoints} points.`
                  : iWon
                  ? `You win with ${myPoints} points. Your opponent had ${opponentPoints} points.`
                  : `You lost with ${myPoints} points. Your opponent had ${opponentPoints} points.`}
              </S.GameEndedStatsText>
            </S.GameEndedStats>
          </Fragment>
        )}
        {!gameEnded && (
          <Fragment>
            <S.Bottom>
              <NewLetters
                hadleGetNewWords={hadleGetNewWords}
                newWords={newWords}
              />
              {_map(
                newWords
                  ? gameRoomState.lettersRoundOne
                  : gameRoomState.lettersRoundOneSetTwo,
                (lettersObject, index) => (
                  <S.Letter
                    key={index}
                    clicked={clickedLetterIndexes[index]}
                    disabled={clickedLetterIndexes[index]}
                    onClick={_partial(this.handleLetterClick, [
                      lettersObject.x,
                      index
                    ])}
                  >
                    <S.ActualLetter>{lettersObject.x[1]}</S.ActualLetter>
                  </S.Letter>
                )
              )}
            </S.Bottom>
            <S.ChosenLettersWrap>
              <S.EraseButton onClick={this.handleDeletePress}>
                <S.EraseButtonText>DELETE</S.EraseButtonText>
              </S.EraseButton>
              {choosenLetters.length > 0 && (
                <S.ChosenLettersContainer>
                  <S.ChosenLetters>
                    {_map(choosenLetters, letter => _identity(letter[1]))}
                  </S.ChosenLetters>
                </S.ChosenLettersContainer>
              )}
              <S.SendButton onClick={this.handleSendClick}>
                <S.EraseButtonText>
                  {gameEnded ? "GO BACK TO MENU" : "SEND"}
                </S.EraseButtonText>
              </S.SendButton>
            </S.ChosenLettersWrap>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default LetterChoosing;
