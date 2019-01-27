import styled from "styled-components";

export const Container = styled.div`
  background: #1e2942;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const PlayerPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 0 10px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const PlayerName = styled.span`
  color: white;
`;
export const TimerWrap = styled.div`
  display: flex;
  background: #233454;
  height: 50px;
  width: 100px;
  margin-top: -10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(100% / 2 - 50px);
  top: 0;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;
export const TimerText = styled.span`
  margin-top: 5px;
  color: #04cbf4;
  font-weight: bold;
  font-size: ${({ gameEnded }) => (gameEnded ? "12px" : "18px")};
`;
export const Bottom = styled.div`
  background: #233454;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 45px;
`;
export const Letter = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 15px;
  border: ${({ newWords }) =>
    newWords ? "2px solid #D28B11" : "2px solid #8ab618"};
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
  font-weight: bold;
  font-size: 18px;
  color: white;
`;
export const WordRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 10px;
`;
export const LetterWord = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid ${({ empty }) => (empty ? "#3b3c45" : "#8ab618")};
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
  color: ${({ empty }) => (empty ? "rgba(255,255,255,.3)" : "white")};
  font-size: 10px;
`;
export const ChosenLettersWrap = styled.div`
  position: absolute;
  bottom: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;
export const ChosenLettersContainer = styled.div`
  background: rgba(138, 182, 24, 0.85);
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
  height: 45px;
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
  height: 45px;
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
  background: #23232f;
  margin: 8px;
  margin-top: 0px;
  border-radius: 10px;
`;
export const MidleRight = styled.div`
  display: flex;
  flex: 1;
  background: #23232f;
  margin: 8px;
  margin-top: 0px;
  border-radius: 10px;
`;
export const MiddleRowWrap = styled.div`
  width: 100%;
  overflow: scroll;
`;
export const GameEndedStats = styled.div`
  background: #233454;
  height: 70px;
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
