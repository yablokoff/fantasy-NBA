import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Store } from "./base";
import { CARDS_COUNT, CARDS_SHOW_COUNT, DATE_FORMAT } from "../constants/defaults";
import { getRandomIntList } from "../utils";


dayjs.extend(utc);


// Класс который сохраняет предложенные пользователю карты.
const FetchedCards = function() {};
FetchedCards.prototype = Object.create(Store.prototype);
FetchedCards.prototype.constructor = Store;

FetchedCards.prototype.STORE_KEY = 'fetched_cards';

FetchedCards.prototype._formatting = function(data) {
    const now = dayjs.utc();
    return {
        date: now.format(DATE_FORMAT),
        ...data
    };
};

FetchedCards.prototype.getIds = function() {
    const data = this.get();
    if (data && data.date === dayjs.utc().format(DATE_FORMAT)) {
        return data.card_ids;
    } else {
        return getRandomIntList({ count: CARDS_SHOW_COUNT, rangeMax: CARDS_COUNT });
    }
};

export const fetchedCards = new FetchedCards();


// Класс который сохраняет выбранные пользователем карты.
const SelectedCards = function() {};
SelectedCards.prototype = Object.create(Store.prototype);
SelectedCards.prototype.constructor = Store;

SelectedCards.prototype.STORE_KEY = 'selected_cards';

SelectedCards.prototype._formatting = function({ selected_ids, ts }) {
    const date = dayjs.utc(ts);
    return {
        date: date.format(DATE_FORMAT),
        card_ids: selected_ids,
    };
};

SelectedCards.prototype.checkForInvalidate = function() {
    const data = this.get();
    if (data) {
        const now = dayjs.utc();
        if (data.date === now.format(DATE_FORMAT)) {
            return data;
        } else {
            this.clear();
        }
    }
};

export const selectedCards = new SelectedCards();
