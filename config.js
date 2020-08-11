const path = require('path');


const PROJECT_ROOT = process.cwd();
const SOURCE_DIR = path.join(PROJECT_ROOT, 'src');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');


let environment = process.env.NODE_ENV;
module.exports = {
    env: {
        production: environment !== 'development',
        development: environment === 'development'
    },

    SOURCE_DIR: SOURCE_DIR,
    DIST_DIR: DIST_DIR,
    DIST_URL: process.env.DIST_URL || ''
};
