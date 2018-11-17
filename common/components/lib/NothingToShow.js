import React from 'react';
import { View } from 'react-native';
import Text from './LPText';

export default class NothingToShow extends React.Component {

    render() {

        return (
            <View style={styles.item}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.bold}>You don't have any appointments, let's change that! We have absolutely amazing offers just for you!</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        padding: 10,
        borderRadius: 3,
        elevation: 5,
        marginBottom: 20
    },
    bold: {
        fontWeight: '900'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
}
