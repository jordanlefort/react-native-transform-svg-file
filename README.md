# react-native-transform-svg-file

Transform SVG files to SVG components. Use [react-native-svg](https://github.com/react-native-community/react-native-svg#installation).

### Install library from npm
```
    yarn add react-native-transform-svg-file
```

#### Link react-native-svg (RN < 0.60)

```
    react-native link react-native-svg
```


#### Needed only for IOS (RN >= 0.60):

```
    cd ios && pod install
```

Go to [react-native-svg](https://github.com/react-native-community/react-native-svg#installation) for more details;

### Generate SVG components

- create directory in your react-native application
- store your svg in this directory
- launch 

```
    rntsf -g svg_directory_path
```

### Use SVG components

```js
import React from 'react';
import { View } from 'react-native';
import SVG from 'react-native-transform-svg-file';

const ExampleSVG = () => (
    <View>
        <Svg name="MySvgName" />
    </View>
);

export default ExampleSVG;
```

### Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `name` | `String` |  | Name of SVGfile [more details](#svg-name-props)
| `height` | `String` | width of svg file  | Override height property in SVG component 
| `width` | `String` | height of svg file | Override width property in SVG component
| `viewBow` | `String` | viewBox of svg file | Override viewBox property in SVG component


### SVG Name props

###### "my-svg-file.svg" = MySvgFile;
###### "MySVGFile.svg" = MySVGFile;


