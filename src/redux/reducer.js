import { facebookAdIds } from "../constants";
const initialState = { gameRoomDatabaseRef: {}, preloadedInterstitial: false };

export const SET_GAME_ROOM_DATABASE_REF = "SET_GAME_ROOM_DATABASE_REF";
export const PRELOAD_AD = "PRELOAD_AD";
export const PRELOAD_AD_SUCCESS = "PRELOAD_AD_SUCCESS";

const FBInstant = window.FBInstant;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_ROOM_DATABASE_REF:
      return { ...state, gameRoomDatabaseRef: action.payload };
    case PRELOAD_AD_SUCCESS:
      return { ...state, preloadedInterstitial: action.payload };
    default:
      return state;
  }
}

export const preloadAdRedux = type => {
  return dispatch => {
    const supportedAPIs = FBInstant.getSupportedAPIs();
    const isSupported = supportedAPIs.find(
      api => api === "getInterstitialAdAsync"
    );
    if (!isSupported) return;
    window.FBInstant.getInterstitialAdAsync(facebookAdIds[type])
      .then(interstitial => {
        interstitial.loadAsync().then(() => {
          dispatch({
            type: PRELOAD_AD_SUCCESS,
            payload: interstitial
          });
        });
      })
      .catch(e =>
        dispatch({
          type: PRELOAD_AD_SUCCESS,
          payload: e.code
        })
      );
  };

  //this.showAd();
};
