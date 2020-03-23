import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Button from './Button';
import Colors from '../constants/Colors';

const PRIORITY = 'PRIORITY';
const DATE = 'DATE';
const DESCRIPTION = 'DESCRIPTION';
const ASCENDING = 'ASCENDING';
const DESCENDING = 'DESCENDING';

const MARGIN_LEFT = 0;
const TOP_MARGIN = 140;
const ANIMATION_DURATION = 250;

const FiltersPopup = props => {

    const { callback, filterType, sortingType } = props;
    const [filter, setFilter] = useState(filterType || DATE);
    const [sorting, setSorting] = useState(sortingType || ASCENDING);

    // Initial animation value
    const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').width));

    // Triggers animation
    useEffect(() => {
        Animated.timing(
            slideAnim, {
                toValue: MARGIN_LEFT,
                duration: ANIMATION_DURATION,
            }
        ).start();
    });

    return(
        <Animated.View style={{...styles.popupContainer, left: slideAnim}}>
            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Sort by</Text>
            </View>
            <View style={{
                width: Dimensions.get('window').width * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between'               
            }}>
                <View style={{
                    width: Dimensions.get('window').width * 0.9 / 2,
                    justifyContent: 'flex-start'
                }}>
                    <Button
                        title={DATE}
                        titleColor={filter === DATE ? Colors.WHITE : Colors.PRIMARY}
                        fontSize={16}
                        backgroundColor={filter === DATE ? Colors.PRIMARY : Colors.WHITE}
                        width='90%'
                        onPress={() => {
                            setFilter(DATE);
                            callback(DATE, sorting);
                        }}
                    />
                    <Button
                        title={PRIORITY}
                        titleColor={filter === PRIORITY ? Colors.WHITE : Colors.PRIMARY}
                        fontSize={16}
                        backgroundColor={filter === PRIORITY ? Colors.PRIMARY : Colors.WHITE}
                        width='90%'
                        onPress={() => {
                            setFilter(PRIORITY);
                            callback(PRIORITY, sorting);
                        }}
                    />
                    <Button
                        title={DESCRIPTION}
                        titleColor={filter === DESCRIPTION ? Colors.WHITE : Colors.PRIMARY}
                        fontSize={16}
                        backgroundColor={filter === DESCRIPTION ? Colors.PRIMARY : Colors.WHITE}
                        width='90%'
                        onPress={() => {
                            setFilter(DESCRIPTION);
                            callback(DESCRIPTION, sorting);
                        }}
                    />
                </View>
                <View style={{
                    width: Dimensions.get('window').width * 0.9 / 2,
                    justifyContent: 'flex-start'
                }}>
                    <Button
                        title={filter === DATE ? 'OLDER FIRST' : filter === PRIORITY ? 'LOW TO HIGH' : 'A TO Z'}
                        titleColor={sorting === ASCENDING ? Colors.WHITE : Colors.PRIMARY}
                        fontSize={16}
                        backgroundColor={sorting === ASCENDING ? Colors.PRIMARY : Colors.WHITE}
                        width='90%'
                        onPress={() => {
                            setSorting(ASCENDING);
                            callback(filter, ASCENDING);
                        }}
                    />
                    <Button
                        title={filter === DATE ? 'NEWER FIRST' : filter === PRIORITY ? 'HIGH TO LOW' : 'Z TO A'}
                        titleColor={sorting === DESCENDING ? Colors.WHITE : Colors.PRIMARY}
                        fontSize={16}
                        backgroundColor={sorting === DESCENDING ? Colors.PRIMARY : Colors.WHITE}
                        width='90%'
                        onPress={() => {
                            setSorting(DESCENDING);
                            callback(filter, DESCENDING);
                        }}
                    />
                </View>
            </View>
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
        top: TOP_MARGIN,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40
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
    }
});

export default FiltersPopup;