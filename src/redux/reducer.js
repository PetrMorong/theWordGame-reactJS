const initialState = { gameRoomDatabaseRef: {} };

export const SET_GAME_ROOM_DATABASE_REF = "SET_GAME_ROOM_DATABASE_REF";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_ROOM_DATABASE_REF:
      return { gameRoomDatabaseRef: action.payload };
    default:
      return state;
  }
}
