// @flow
/*eslint-disable no-nested-ternary*/
import _toUpper from "lodash/toUpper";
import _get from "lodash/get";
import _map from "lodash/map";
import _keys from "lodash/keys";
import LettersEnglish, { vowelsEnglish } from "../constants/lettersEnglish";
import LettersCzech from "../constants/lettersCzech";
import LettersGerman from "../constants/lettersGeman";

const letters = {
  en: LettersEnglish,
  cz: LettersCzech,
  german: LettersGerman
};

const vowels = {
  en: vowelsEnglish,
  cz: vowelsEnglish,
  german: vowelsEnglish
};

export const generateWordsRandomly = language => {
  const lettersRoundOne = [];
  let wordIndex = 0;
  for (let i = 0, len = 10; i < len; i += 1) {
    if (wordIndex === 3 || wordIndex === 7) {
      const randomNumber = Math.random() * vowels[language].length + 0;
      lettersRoundOne.push({
        x: [wordIndex, vowels[language][Math.floor(randomNumber)]]
      });
    } else {
      const randomNumber = Math.random() * letters[language].length + 0;
      lettersRoundOne.push({
        x: [wordIndex, letters[language][Math.floor(randomNumber)]]
      });
    }
    wordIndex += 1;
  }
  return lettersRoundOne;
};

export const validateWord = (language, words, parsedWord) => {
  let wordIsValid = false;
  for (let i = 0, len = words[language].length; i < len; i += 1) {
    if (_toUpper(words[language][i]) === parsedWord) {
      wordIsValid = true;
      break;
    }
  }
  return wordIsValid;
};

export const sortValidAndInvalidWors = newValidWords =>
  newValidWords.sort((x, y) => (x.valid === y.valid ? 0 : x.valid ? -1 : 1));

export const sortBasedOnLength = newValidWords =>
  newValidWords.sort((a, b) => {
    if ((a.valid && !b.valid) || (!a.valid && b.valid)) return 0;
    return b.text.length - a.text.length;
  });

export const checkIfWordIsAlreadySubmited = (validWords, parsedWord) => {
  let submited = false;
  for (let i = 0, len = validWords.length; i < len; i += 1) {
    if (validWords[i].text === parsedWord && validWords[i].valid) {
      submited = true;
    }
  }
  return submited;
};

export const amIPlayerOneFunc = (parsedUser, playerOne) =>
  parsedUser.uid.length > 0 && playerOne.uid === parsedUser.uid;

export const getOpponentWords = (amIPlayerOne, gameRoomState) =>
  amIPlayerOne
    ? _get(gameRoomState, "roundOnePlayerTwoWords")
    : _get(gameRoomState, "roundOnePlayerOneWords");

export const getOpponentFinished = (amIPlayerOne, gameRoomState) =>
  amIPlayerOne
    ? _get(gameRoomState, "roundOnePlayerTwoWords")
    : _get(gameRoomState, "roundOnePlayerOneWords");

export const countPoints = words => {
  let points = 0;
  _map(_keys(words), index => {
    points += words[index].valid ? words[index].text.length : 0;
  });
  return points;
};

export const dbRefUpdated = (prev, current) => {
  return !Object.keys(prev).length && Object.keys(current).length > 0;
};

export const getUserObject = FBInstant => ({
  uid: FBInstant.player.getID(),
  displayName: FBInstant.player.getName(),
  photoURL: FBInstant.player.getPhoto()
});

export const isGameRefSet = gameRoomDatabaseRef =>
  Object.keys(gameRoomDatabaseRef).length > 0;
