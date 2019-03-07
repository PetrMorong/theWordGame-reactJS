import styled from "styled-components";

export const PlayButton = {
  color: "white",
  height: 60,
  backgroundColor: "#8FB842",
  width: "100%"
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
export const LeagueChoosingContainer = styled.div`
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
export const CountyContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .carousel-slider {
    width: 300px !important;
  }
  .carousel-slider img {
    width: 70px !important;
    display: flex !important;
  }
  .carousel .slide {
    background: transparent !important;
  }
`;

export const CountySliderItem = styled.div`
  width: 300px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Flag = styled.img`
  width: 75px;
  height: 70px;
  margin-bottom: 10px;
`;
export const CountryName = styled.span`
  font-size: 15px;
  color: white;
  font-weight: 300px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
export const LeagueContainer = styled.div`
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin: 20px;
  .carousel-slider {
    width: 300px !important;
  }
  .carousel-slider img {
    width: auto !important;
    display: flex !important;
  }
  .carousel .slide {
    background: transparent !important;
  }
`;
export const LeagueImage = styled.img`
  height: ${({ height }) => height};
`;

export const MoneyContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 500;
  color: white;
  letter-spacing: 1px;
  text-transform: uppercase;
  span {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: -8px;
  }
  p {
    margin-left: 10px;
  }
`;
export const MoneyIcon = styled.img`
  width: 35px;
`;
export const MoneyIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: white;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
export const PLayButtonContainer = styled.div`
  width: 300px;
  height: 50px;
  background-color: #8fb842;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const AccountBalance = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`;
