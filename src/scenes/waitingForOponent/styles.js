import styled from "styled-components";

export const Container = styled.div`
  background: url("https://scontent.fprg1-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/49515752_1426050130870579_1549144594283757568_n.jpg?_nc_cat=108&_nc_ht=scontent.fprg1-1.fna&oh=1624c5c857f294c0655e1733d76160fc&oe=5CF2B6DE");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
export const Text = styled.span`
  color: white;
  margin-bottom: 20px;
`;
export const BackWrap = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;
