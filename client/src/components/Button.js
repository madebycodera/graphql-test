import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const ButtonRelative = props => {

    const { onPress } = props;

    return(
        <Button
            type='solid'
            title={props.title || 'Done'}
            containerStyle={styles.buttonContainerStyle}
            titleStyle={{
                ...styles.buttonTitleStyle,
                color: props.titleColor || Colors.WHITE,
                fontSize: props.fontSize || 18
            }}
            buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: props.backgroundColor || Colors.PRIMARY,
                width: props.width || Dimensions.get('window').width * 0.9
            }}
            onPress={onPress}/>
    );
};

const styles = StyleSheet.create({
    buttonContainerStyle: {
        height: 44,
        marginTop: 20
    },
    buttonTitleStyle: {
        fontWeight: '600'
    },
    buttonStyle: {
        borderRadius: 6,
        height: 44,
        borderColor: Colors.PRIMARY, 
        borderWidth: 1
    },
});

export default ButtonRelative;