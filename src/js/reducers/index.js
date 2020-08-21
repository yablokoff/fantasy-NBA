import { combineReducers } from "redux";
import preloaderReducer from "./preloader";
import userReducer from "./user";
import fetchedCardsIDsReducer from "./fetchedCards";
import cardsReducer from "./cards";
import selectedCardsIDsReducer from "./selectedCards";


const rootReducer = combineReducers({
    preloader: preloaderReducer,
    user: userReducer,
    fetchedCardsIDs: fetchedCardsIDsReducer,
    cards: cardsReducer,
    selectedCardsIDs: selectedCardsIDsReducer
});

export default rootReducer;
