import { FAVORITE_LIST } from "../types/favorite";

const initialState: any = {
  favoriteList: [],
  
};

export const favoriteReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case FAVORITE_LIST:
      console.log('action.payload', action.payload)
      return { ...state, favoriteList: action.payload };

    default:
      return state;
  }
};
