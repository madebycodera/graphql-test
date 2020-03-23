import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Button from './Button';
import Colors from '../constants/Colors';

const ADD = 'Add';
const TOP_MARGIN = 140;
const ANIMATION_DURATION = 250;

const AddEditPopup = props => {

    const { callback, title, item } = props;
    const [text, setText] = useState(item? item.description : null);
    const [priority, setPriority] = useState(item? item.priority.toString() : null);

    // Initial animation value
    const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').height));

    // Triggers animation
    useEffect(() => {
        Animated.timing(
            slideAnim, {
                toValue: TOP_MARGIN,
                duration: ANIMATION_DURATION,
            }
        ).start();
    });

    return(
        <Animated.View style={{...styles.popupContainer, top: slideAnim}}>
            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.fieldContainer}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.inputTitleText}>{text ? 'Description' : ''}</Text>
                    </View>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Description'
                    placeholderTextColor={Colors.PLACEHOLDER}
                    controlled={true}
                    value={text}
                    onChangeText={(value) => setText(value)}
                />
            </View>
            <View style={styles.fieldContainer}>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.inputTitleText}>{priority ? 'Priority' : ''}</Text>
                </View>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Priority (optional)'
                    placeholderTextColor={Colors.PLACEHOLDER}
                    keyboardType='number-pad'
                    controlled={true}
                    value={priority}
                    onChangeText={(value) => {
                        if (!isNaN(parseInt(value))) {
                            if (parseInt(value) === 0) {
                                setPriority('1');
                            }
                            setPriority(value);
                        } else {
                            setPriority('');
                        }
                    }}
                />
            </View>
            <Button 
                onPress={
                    title === ADD ? 
                    callback.bind(this, text, parseInt(priority)) 
                    : callback.bind(this, item.id, text, parseInt(priority))}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - TOP_MARGIN,
        position: 'absolute',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    textInputStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.9,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDERS,
        fontSize: 16,
        color: Colors.TEXT
    },
    titleTextContainer: {
        width: Dimensions.get('window').width,
        alignItems: 'flex-start'
    },
    titleText: {
        color: Colors.TEXT,
        fontSize: 26,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10
    },
    inputTitleText: {
        color: Colors.TEXT,
        fontSize: 13,
        fontWeight: '600'
    },
    fieldContainer: {
        marginTop: 10,
        width: Dimensions.get('window').width * 0.9,
        height: 70
    }
});

export default AddEditPopup;