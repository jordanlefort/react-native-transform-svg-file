import React from 'react';
import { ScrollView } from 'react-native';

const SVG = (props) => {
    switch(props.name){
            default:
            console.warn(`SVG: ${props.name}, not found`);
            return null;
    }
}

export const ViewMySVG = () => (
    <ScrollView>

    </ScrollView>
);


export default ((props) => SVG(props));
