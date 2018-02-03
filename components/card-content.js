import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { red } from "../utils/colors";

export default CardContent = (props) => (
    <View style={styles.questionWrapper}>
        <Text style={styles.title}>
            {props.cardContent}
        </Text>
        <TouchableOpacity onPress={props.onFlip}>
            <Text style={styles.flipLink}>{props.flipLinkText}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    questionWrapper: {
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        padding: 10,
        fontWeight: 'bold'
    },
    flipLink: {
        color: red,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
