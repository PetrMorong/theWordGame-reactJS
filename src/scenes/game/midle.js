import React, { Component } from "react";
import _map from "lodash/map";
import _split from "lodash/split";
import * as S from "./styles";

class Midle extends Component {
  render() {
    const { validWords, gameEnded, opponentWords } = this.props;
    return (
      <S.MidleWrap>
        <S.Midle>
          <S.MidleLeft>
            <S.MiddleRowWrap>
              <div style={{ height: 10 }} />
              {_map(validWords, (item, key) => {
                const emptyLetters = [];
                for (let i = 0, len = 10 - item.text.length; i < len; i += 1) {
                  emptyLetters[i] = <S.LetterWord empty key={i + 20} />;
                }
                return (
                  <S.WordRow key={key}>
                    {_map(_split(item.text, ""), (letter, index) => (
                      <S.LetterWord key={index} empty={!item.valid}>
                        <S.LetterWordText empty={!item.valid}>
                          {letter}
                        </S.LetterWordText>
                      </S.LetterWord>
                    ))}
                    {emptyLetters}
                  </S.WordRow>
                );
              })}
              <div style={{ height: 10 }} />
            </S.MiddleRowWrap>
          </S.MidleLeft>
          <S.MidleRight>
            <S.MiddleRowWrap>
              <div style={{ height: 10 }} />
              {gameEnded &&
                _map(opponentWords, (item, key) => {
                  const emptyLetters = [];
                  for (
                    let i = 0, len = 10 - item.text.length;
                    i < len;
                    i += 1
                  ) {
                    emptyLetters[i] = (
                      <S.LetterWordOpponent empty key={i + 20} />
                    );
                  }
                  return (
                    <S.WordRow key={key}>
                      {_map(_split(item.text, ""), (letter, index) => (
                        <S.LetterWordOpponent key={index} empty={!item.valid}>
                          <S.LetterWordText empty={!item.valid}>
                            {letter}
                          </S.LetterWordText>
                        </S.LetterWordOpponent>
                      ))}
                      {emptyLetters}
                    </S.WordRow>
                  );
                })}
              <div style={{ height: 10 }} />
            </S.MiddleRowWrap>
          </S.MidleRight>
        </S.Midle>
      </S.MidleWrap>
    );
  }
}

export default Midle;
