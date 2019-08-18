#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
const style = require('./methods/style');

if(!args.g || typeof args.g === 'boolean'){
    console.error(style.err('-g argument is required \'-g svg_files_path\''));
    process.exit();
}

const paths = args.g.split(':');
let SVG_DIR = paths[0];
if(SVG_DIR.charAt(SVG_DIR.length -1) === '/'){
    SVG_DIR = SVG_DIR.slice(0, SVG_DIR.length - 2);
}

shell.exec(`cd ${process.cwd()}/node_modules/react-native-transform-svg-file/ && node main.js -g ${process.cwd()}/${SVG_DIR} -f ${process.cwd()}/node_modules/react-native-transform-svg-file`);
