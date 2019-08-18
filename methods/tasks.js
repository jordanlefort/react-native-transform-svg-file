const files = require('./files');
const transform = require('./transform');

let iconModel;
let indexModel;


files.readIconModel((err, data) => { iconModel = data;});
files.readIndexModel((err, data) => { indexModel = data;});


const init = async (SVG_DIR, COMPONENT_DIR) => {
    files.init(SVG_DIR, COMPONENT_DIR);
    files.createComponentsDir();
    let SVGDirContent = await files.readSVGDir();
    SVGDirContent = files.filterSVGDir(SVGDirContent);
    let SVGFilesContent = await files.readSVGFiles(SVGDirContent);
    let SVGRN = transform.SVGFileToComponent(SVGFilesContent);
    let SVGRNComponents = transform.SVGRNtoFileContent(SVGRN, iconModel);
    let importComponentList = transform.importComponentList(SVGRN);
    let objectComponentList = transform.objectComponentList(SVGRN);
    let viewMySvgComponent = transform.viewMySvgComponent(SVGRN);
    let indexComponent = transform.createIndexComponent(importComponentList, objectComponentList, viewMySvgComponent, indexModel);
    files.createComponents(SVGRNComponents, indexComponent);
};

module.exports = init;
