import styled from "styled-components";

export const spinnerStyle = { color: "white", marginRight: 13 };

export const Container = styled.div`
  background: url("https://scontent.fprg1-1.fna.fbcdn.net/v/t1.15752-9/52634634_636609293461835_6599293790916182016_n.jpg?_nc_cat=102&_nc_ht=scontent.fprg1-1.fna&oh=a5e5d6ff9eedb614f9de02f40a6977cb&oe=5CE90610");
  background-size: cover;
  background-position: -35px 0;
  background-position: -1px -70px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;
export const BackgroundOverlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: calc(100vw - 43px);
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const PlayerPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
  margin-right: 0px;
  border: ${({ opponent }) =>
    opponent ? "3px solid #D28B11" : "3px solid #1E88E5"};
  z-index: 3;
`;
export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 3px;
  margin-bottom: 10px;
  justify-content: space-between;
  position: relative;
`;
export const PlayerInfoWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const PlayerName = styled.span`
  color: white;
  font-style: 15px;
  padding-left: 15px;
`;
export const TimerWrap = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  height: 75px;
  width: 110px;
  margin-top: -10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: calc(100% / 2 - 56px);
  top: 0;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;
export const TimerText = styled.span`
  margin-top: 5px;
  color: ${({ last10sec }) => (last10sec ? "red" : "black ")};
  font-weight: 400;
  font-size: 12px;
`;
export const Bottom = styled.div`
  background: rgba(255, 255, 255, 0.5);
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 45px;
`;
export const Letter = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 15px;
  background: ${({ newWords, hasNewWords }) =>
    newWords ? (hasNewWords ? "#696969" : "#D28B11") : "#1E88E5"};
  border: ${({ newWords }) =>
    newWords ? "2px solid #D28B11" : "2px solid #1E88E5"};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ clicked }) => (clicked ? 0 : 1)};
  transition: 150ms;
  &:active {
    opacity: ${({ hasNewWords, clicked }) =>
      clicked ? 0 : hasNewWords ? "1" : "0.6"}
`;
export const ActualLetter = styled.span`
  font-weight: 500;
  font-size: 17px;
  color: white;
  color: ${({ hasNewWords }) =>
    hasNewWords ? "rgba(255, 255, 255, .6)" : "white"};
`;
export const WordRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #aea9a8;
  padding: 5px 5px;
  margin: 0 10px;
  border-radius: 4px;
  margin-bottom: 6px;
`;
export const LetterWordOpponent = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid ${({ empty }) => (empty ? "#7b7b7b" : "D28B11")};
  background: ${({ empty }) => (empty ? "transparent" : "#D28B11")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LetterWord = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: ${({ empty }) => (empty ? "transparent" : "#1E88E5")};
  border: 1px solid ${({ empty }) => (empty ? "#7b7b7b" : "#1E88E5")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LetterWordIncative = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #3b3c45;
`;
export const LetterWordText = styled.span`
  color: white;
  font-size: 10px;
`;
export const ChosenLettersWrap = styled.div`
  position: absolute;
  bottom: 65px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;
export const ChosenLettersContainer = styled.div`
  background: #1e88e5;
  border-radius: 20px;
  padding: 13px 15px;
  padding-right: 8px;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChosenLetters = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: white;
  letter-spacing: 7px;
`;
export const EraseButton = styled.div`
  background: #717171;
  width: ${({ gameEnded }) => (gameEnded ? "180px" : "90px")};
  height: 45px;
  border-top-right-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;
  &:active {
    opacity: 0.3;
  }
`;
export const NewWordsButton = styled.div`
  background: #717171;
  width: ${({ gameEnded }) => (gameEnded ? "180px" : "90px")};
  height: 40px;
  border-top-right-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EraseButtonText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
`;
export const SendButton = styled.div`
  background: #717171;
  width: ${({ gameEnded }) => (gameEnded ? "180px" : "90px")};
  height: 40px;
  border-top-left-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;
  &:active {
    opacity: 0.3;
  }
`;
export const SendButtonText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
`;
export const MidleWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const Midle = styled.div`
  display: flex;
  flex: 1;
  margin: 10px;
  margin-top: 0px;
  flex-direction: row;
`;
export const MidleLeft = styled.div`
  display: flex;
  flex: 1;
  background: rgba(255, 255, 255, 0.35);
  margin: 8px;
  margin-top: 0px;
  border-radius: 10px;
  height: calc(100vh - 217px);
  overflow: hidden;
`;
export const MidleRight = styled.div`
  display: flex;
  flex: 1;
  background: rgba(255, 255, 255, 0.35);
  margin: 8px;
  margin-top: 0px;
  border-radius: 10px;
  height: calc(100vh - 217px);
  overflow: hidden;
`;
export const MiddleRowWrap = styled.div`
  margin-right: -17px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 17px;
  box-sizing: content-box;
`;
export const GameEndedStats = styled.div`
  background: rgba(255, 255, 255, 0.5);
  height: 65px;
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const GameEndedStatsText = styled.span`
  font-size: 20px;
  color: white;
  font-weight: bold;
`;
export const SettingsWrap = styled.div`
  background: black;
  height: 100vh;
  width: 43px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  flex-direction: column;
`;
export const PlayerStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
`;
export const PlayerPoints = styled.div`
  color: black;
  text-align: center;
  font-size: 20px;
  margin-top: 13px;
  margin-bottom: 6px;
  line-height: 10px;
`;
