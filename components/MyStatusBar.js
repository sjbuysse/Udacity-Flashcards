import React from 'react';
import { Constants } from 'expo';
import { StatusBar, Text, View } from "react-native";

export default MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[{height: Constants.statusBarHeight}, { backgroundColor: backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);