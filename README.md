#react-native-transform-svg-file

Transform SVG files to SVG components. Use [react-native-svg](https://github.com/react-native-community/react-native-svg#installation).

### Install library from npm
```
    npm install react-native-transform-svg-file --save
```

or 

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

