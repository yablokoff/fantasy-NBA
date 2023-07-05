import { shuffle } from 'd3-array';

export const getShuffledList = (list, count = 5) => {
    return shuffle(list).slice(0, count);
};
