const args = require('minimist')(process.argv.slice(2));
const style = require('./methods/style');

if(!args.g || typeof args.g === 'boolean'){
    console.error(style.err('-g argument is required \'-g svg_files_path:generated_components_path\''));
    process.exit();
}

const paths = args.g.split(':');
const SVG_DIR = paths[0];
const COMPONENT_DIR = paths[1];

if(!COMPONENT_DIR){
    console.error(style.err('please indicate storage path of generated components \'-g svg_files_path:generated_components_path\''));
    process.exit();
}
if(!SVG_DIR){
    console.error(style.err("please indicate storage path of svg files '-g svg_files_path:generated_components_path'"));
    process.exit();
}

require('./methods/tasks')(SVG_DIR, COMPONENT_DIR);
