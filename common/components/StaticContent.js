import React from 'react';
import { View } from 'react-native';
import Text from './lib/LPText';

export default class StaticContent extends React.Component {

    render() {
        const { heading, description } = this.props.content;
            descriptionArray = description.split('<p><br/></p>');
        return (
            <View style={styles.content}>
                <Text style={styles.heading}>{heading}</Text>
                {descriptionArray.map(ele => <Text key={ele} style={styles.description}>{ele}</Text>)}
            </View>
        )
    }
}

const styles = {
    content: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        elevation: 3
    },
    heading: {
        fontWeight: '900',
        fontSize: 24,
        marginBottom: 10
    },
    description: {
        fontSize: 14
    }
}
