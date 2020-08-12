import React from "react";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

export const getRandomIntList = ({ count=5, rangeMin=1, rangeMax=100 }) => {
    let result = [];

    while (result.length < count) {
        const new_int = randomInteger(rangeMin, rangeMax);
        if (!result.includes(new_int)) result.push(new_int);
    }

    return result
};


/**
 * Async img loading
 */
const loadImage = path =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({path, status: 'ok'});
        img.onerror = () => resolve({path, status: 'error'});

        img.src = path;
    });

export const loadImages = sources => {
    if (!sources || !sources.length) {
        throw new Error('sources required');
    }
    return Promise.all(sources.map(loadImage));
};
