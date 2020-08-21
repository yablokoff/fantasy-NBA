import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { Store } from "./base";
import { STORAGE_DATE_FORMAT, TIME_ZONE } from "../constants/defaults";


dayjs.extend(utc);
dayjs.extend(timezone);


const now = () => dayjs().tz(TIME_ZONE);


// Класс который сохраняет предложенные пользователю карты.
const FetchedCards = function() {};
FetchedCards.prototype = Object.create(Store.prototype);
FetchedCards.prototype.constructor = Store;

FetchedCards.prototype.STORE_KEY = 'fetched_cards';

FetchedCards.prototype._formatting = function(data) {
    return {
        date: now().format(STORAGE_DATE_FORMAT),
        ...data
    };
};

FetchedCards.prototype._isValid = function(data) {
    if (data.date === now().format(STORAGE_DATE_FORMAT)) {
        return data;
    }
};

export const fetchedCards = new FetchedCards();


// Класс который сохраняет выбранные пользователем карты.
const SelectedCards = function() {};
SelectedCards.prototype = Object.create(Store.prototype);
SelectedCards.prototype.constructor = Store;

SelectedCards.prototype.STORE_KEY = 'selected_cards';

SelectedCards.prototype._formatting = function({ selected_ids, ts }) {
    const setDate = dayjs(ts).tz(TIME_ZONE);
    return {
        date: setDate.format(STORAGE_DATE_FORMAT),
        card_ids: selected_ids,
    };
};

SelectedCards.prototype._isValid = function(data) {
    if (data.date === now().format(STORAGE_DATE_FORMAT)) {
        return data;
    }
};

export const selectedCards = new SelectedCards();
