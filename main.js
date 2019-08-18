const args = require('minimist')(process.argv.slice(2));
const style = require('./methods/style');

if(!args.g || typeof args.g === 'boolean'){
    console.error(style.err('-g argument is required \'-g svg_files_path\''));
    process.exit();
}

const SVG_DIR = args.g;
const COMPONENT_DIR = args.f+"/component";


if(!SVG_DIR){
    console.error(style.err("please indicate storage path of svg files '-g svg_files_path'"));
    process.exit();
}

require('./methods/tasks')(SVG_DIR, COMPONENT_DIR);
