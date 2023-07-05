/**
 * Async img loading
 */
const loadImage = path =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ path, status: 'ok' });
        img.onerror = () => resolve({ path, status: 'error' });

        img.src = path;
    });

export const loadImages = sources => {
    if (!sources || !sources.length) {
        throw new Error('sources required');
    }
    return Promise.all(sources.map(loadImage));
};
