import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ROUTES } from '../../constants';
import Text from './LPText';

export default class Card extends React.Component {

    render() {
        const { title, description, image } = this.props;

        return (
            <TouchableOpacity onPress={this.handleCardPress}>
                <View style={styles.card}>
                    <View>
                        <Image style={styles.image}
                            source={{uri: image}} />
                    </View>
                    <View><Text style={styles.title}>{title}</Text></View>
                    <View><Text>{description}</Text></View>
                </View>
            </TouchableOpacity>
        )
    }

    handleCardPress = () => {
        const { onClick, navigation } = this.props;
        if (ROUTES[onClick]){
            navigation.navigate(ROUTES[onClick]);
        }
    }
}

const styles = {
    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3,
        elevation: 5,
        marginBottom: 20
    },
    title: {
        fontWeight: '800',
        paddingVertical: 8
    },
    description: {

    },
    image: {
        height: 230,
        width: '100%'
    }
}
