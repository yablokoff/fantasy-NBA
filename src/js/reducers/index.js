import { combineReducers } from "redux";
import preloaderReducer from "./preloader";
import userReducer from "./user";
import cardsReducer from "./cards";
import selectedCardsReducer from "./selectedCards";


const rootReducer = combineReducers({
  preloader: preloaderReducer,
  user: userReducer,
  cards: cardsReducer,
  selectedCards: selectedCardsReducer
});

export default rootReducer;
