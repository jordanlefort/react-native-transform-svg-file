const fs = require("fs");
const path = require("path");
const style = require('./style');
let SVG_DIR_PATH;
let COMPONENT_DIR_PATH;

const init = (SVG_DIR, COMPONENT_DIR) => {
    SVG_DIR_PATH = path.join(__dirname, `../${SVG_DIR}`) ;
    COMPONENT_DIR_PATH = path.join(__dirname, `../${COMPONENT_DIR}`) ;
}

const readSVGDir = () => new Promise((res, rej) => fs.readdir(SVG_DIR_PATH, (err, data) => {
    if(err) rej(err);
    res(data);
}));

const filterSVGDir = (SVGDirContent) => SVGDirContent.filter(file => file.includes('.svg'));

const readSVGfile = (SVGFilePath, SVGFileName) => new Promise((res, rej) => fs.readFile(SVGFilePath, 'UTF8', (err, data) => {
    if(err) rej(err);
    let name = SVGFileName.charAt(0).toUpperCase() + SVGFileName.slice(1).replace('.svg','').replace(/[^a-zA-Z ]/g, "");
    res({ name, svg: data });
}));

const readSVGFiles = (SVGDirContent) => new Promise(async(res, rej) => {
    let SVGFiles = await  Promise.all(SVGDirContent.map(SVGFileName => readSVGfile(path.join(SVG_DIR_PATH, SVGFileName),  SVGFileName)));
    res(SVGFiles);
});

const createComponentsDir = () => {
    fs.access(COMPONENT_DIR_PATH, fs.constants.F_OK, (err) => {
       if(err) return fs.mkdir(COMPONENT_DIR_PATH);
    });
    fs.access(path.join(COMPONENT_DIR_PATH, 'SVGIcons'), fs.constants.F_OK, (err) => {
        if(err) return fs.mkdir(path.join(COMPONENT_DIR_PATH, 'SVGIcons'));
    });
};

const readIconModel = (cb) => fs.readFile(path.join(__dirname, "../models/Icon.txt"), 'UTF8', cb);
const readIndexModel = (cb) => fs.readFile(path.join(__dirname, "../models/index.txt"), 'UTF8', cb);

const createComponents = (SVGRNComponents, indexComponent) => {
    Promise.all(SVGRNComponents.map(svg => {
        return new Promise((res, rej) => {
            const COMPONENT_FILE_PATH = path.join(COMPONENT_DIR_PATH, `SVGIcons/${svg.name}.js`);
            fs.writeFile(COMPONENT_FILE_PATH, svg.component, (err, data) => {
                console.log(style.info(`${svg.name} svg generated.`));
                res(true);
            });
        })
    })).then(() => {
        fs.writeFile(path.join(COMPONENT_DIR_PATH, "SVGIcons/index.js"), indexComponent, (err, data) => {
            console.log(style.success("!!! RDY to use !!!"));
        });
    });
}

module.exports = {
    readSVGDir,
    filterSVGDir,
    readSVGFiles,
    createComponentsDir,
    readIconModel,
    createComponents,
    readIndexModel,
    init,
};
