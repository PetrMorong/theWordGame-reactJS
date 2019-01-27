import styled from "styled-components";

export const PlayButton = {
  color: "white",
  height: 50,
  marginBottom: 20,
  marginTop: 40
};
export const PlayWithFriendButton = {
  color: "white",
  height: 50
};
export const Container = styled.div`
  background: #1e2942;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const UserWrap = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const UserImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
export const UserName = styled.span`
  color: white;
`;
export const LanguagesWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 25px;
  display: flex;
  flex-direction: row;
  width: 100px;
`;
export const LanguageButton = styled.div`
  width: auto;
  height: 20px;
  margin: 10px;
  border: ${({ selected }) =>
    selected ? "2px solid #8ab717" : "2px solid #1e2942"};
  border-radius: 2px;
  padding: 1px;
`;
export const LanguageButtonImage = styled.img`
  width: 30px;
  height: 20px;
  object-fit: cover;
`;
