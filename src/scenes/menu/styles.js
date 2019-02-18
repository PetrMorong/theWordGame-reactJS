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
  background: url("https://scontent.fprg1-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/49515752_1426050130870579_1549144594283757568_n.jpg?_nc_cat=108&_nc_ht=scontent.fprg1-1.fna&oh=1624c5c857f294c0655e1733d76160fc&oe=5CF2B6DE");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;
export const BackgroundOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
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
  right: 20px;
  display: flex;
  flex-direction: row;
  width: 100px;
`;
export const LanguageButton = styled.div`
  width: auto;
  height: 20px;
  margin: 10px;
  border: ${({ selected }) =>
    selected ? "2px solid #8ab717" : "2px solid transparent"};
  border-radius: 2px;
  padding: 1px;
`;
export const LanguageButtonImage = styled.img`
  width: 30px;
  height: 20px;
  object-fit: cover;
`;
