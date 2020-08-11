/**
 * Загрузка шрифтов
 *
 * https://github.com/bramstein/fontfaceobserver
 */

import FontFaceObserver from "fontfaceobserver";
import "./_fonts.scss";

/* TODO: вставить реальные шрифты */
const fonts = [
    new FontFaceObserver('Roboto', {
        style: 'normal',
        weight: 400
    }),
    new FontFaceObserver('Roboto', {
        style: 'normal',
        weight: 700
    })
];

Promise.all(fonts).then(function() {
    document.documentElement.className = document.documentElement.className.replace(/\bno-fonts\b/, 'fonts-loaded');
    sessionStorage.fontsLoaded = true;
});
