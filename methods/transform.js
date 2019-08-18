const acceptedSVGtags = [
    "circle",
    "ellipse",
    "g" ,
    "linearGradient",
    "radialGradient",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "tspan",
    "defs",
    "stop",
]

const getSVGTags = (svg) => svg.replace(/\n/g, '').split(/(\<.*?\>)/g).filter(t => rmSpace(t) !== '');

const replaceSvgEntryTagToUpperCase = (svg) => svg.replace(/(^<[a-z])/g, (match, contents) => {
    return `<${contents.charAt(1).toUpperCase()}${contents.slice(2)}`;
});

const replaceSvgEndTagToUpperCase = (svg) => svg.replace(/(^<\/[a-z])/g, (match, contents) => {
    return `</${contents.charAt(2).toUpperCase()}${contents.slice(3)}`;
});

const replaceProperties = (svg) => svg.replace(/([a-z]\-[a-z])/gm, (match, contents) => {
    return contents[0]+contents[2].toUpperCase();
});

const heightPropertiesToProps = (svg) => svg.replace(/(\height+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/,  (match, contents) => {
    let height = match.replace('height=', '');
    return `height={props.height || ${height}}`
});

const widthPropertiesToProps = (svg) => svg.replace(/(\width+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/,  (match, contents) => {
    let width = match.replace('width=', '');
    return `width={props.width || ${width}}`;
});

const viewBoxPropertiesToProps = (svg) => svg.replace(/(viewBox+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/,  (match, contents) => {
    let viewBox = match.replace('viewBox=', '');
    return `viewBox={props.viewBox || ${viewBox}}`;
});

/*const fillPropertiesToProps = (svg) => svg.replace(/(fill+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/,  (match, contents) => {
    let fill = match.replace('fill=', '');
    return `fill={props.fill || ${fill}}`;
});*/

const removeXMLNSProperties = (svg) => svg.replace(/(xmlns+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/, '')

const transformPropertiesToProps = (svg) => removeXMLNSProperties(heightPropertiesToProps(widthPropertiesToProps(viewBoxPropertiesToProps(svg))));

const rmSpace = (svg) => svg.replace(/^\s+|\s+$/g, '');

const indentSvg = (svg) => {
    const tab = "   ";
    let haveSpace = true;
    let spaceNumber = 0;
    return svg.map((s,i) => {
        let currentTagSelfClosing = s.match(/\/[A-Z]*>/i);
        let currentTagClosing = s.match("</");

        if(!currentTagSelfClosing){
            s = tab.repeat(spaceNumber) + s;
            spaceNumber ++;
            return s;
        }

        if(currentTagClosing){
            spaceNumber --;
            s = tab.repeat(spaceNumber) + s;
            return s;
        }
        return tab.repeat(spaceNumber) + s;
    });
}

const SVGformatToSVGReactNativeFormat = (svg) => {
    let SVGTags = getSVGTags(svg);
    let SVGRNtags = SVGTags.filter(tag => acceptedSVGtags.some(item => tag.includes(item))).map((tag, i) => {
        if(i === 0) return transformPropertiesToProps(replaceSvgEntryTagToUpperCase(replaceSvgEndTagToUpperCase(replaceProperties(tag))));
        return replaceSvgEntryTagToUpperCase(replaceSvgEndTagToUpperCase(replaceProperties(tag)));
    });
    let SVGRN = SVGRNtags.map((tag, i) => {
        if(!tag.match(/(\<.*?\>)/g)) return '';
        return `    ${tag}`;
    }).filter(tag => tag !== "" && tag);

    return indentSvg(SVGRN).join('\n');
};

const SVGFileToComponent = (SVGFilesContent) => SVGFilesContent.map(fileContent => ({ name: fileContent.name, svg: SVGformatToSVGReactNativeFormat(fileContent.svg) }));

const transformModelWithSVGRN = (SVGContent, SVGName, iconModel) => iconModel.replace(/##SVG##/, SVGContent).replace(/##NAME##/g, SVGName);

const SVGRNtoFileContent = (SVGRN, iconModel) => SVGRN.map(svg => ({...svg ,component:transformModelWithSVGRN(svg.svg, svg.name, iconModel)}));

const importComponentList = (SVGRN) => SVGRN.map(svg => `import ${svg.name} from "./${svg.name}.js";`).join("\n");

const objectComponentList = (SVGRN) => SVGRN.map(svg => `        case '${svg.name}': return <${svg.name} {...props}/>;`).join("\n");
const viewMySvgComponent = (SVGRN) => SVGRN.map(svg => `        <${svg.name} />`).join("\n");

const createIndexComponent = (importComponentList, objectComponentList, viewMySvgComponent, indexModel) => indexModel
    .replace(/##IMPORT##/, importComponentList)
    .replace(/##VIEWMYSVG##/,  viewMySvgComponent)
    .replace(/##OBJECTCOMPONENT##/, objectComponentList);

module.exports = {
    SVGFileToComponent,
    SVGRNtoFileContent,
    importComponentList,
    objectComponentList,
    createIndexComponent,
    viewMySvgComponent
};

