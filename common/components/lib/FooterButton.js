import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from './Button';
import Text from './LPText';

class FooterButton extends React.Component {
    render() {
        const { content, inActive, handleButtonPress, total } = this.props;

        return (
            <View style={styles.content}>
                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.text}>Total:</Text><Text style={styles.text}>Rs. {total}</Text></View>
                    <View style={{ alignItems: 'flex-end' }}><Text style={styles.textSmall}>Inclusive of all taxes</Text></View>
                </View>
                <Button content={content} inActive={inActive} handleButtonPress={handleButtonPress}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        total: state.bookingDetails.total
    };
}

export default connect(mapStateToProps)(FooterButton);


const styles = {
    content: {
        height: 90,
        backgroundColor: '#fff',
        elevation: 10,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#efefef'
    },
    text: {
        fontWeight: '900',
        fontSize: 16
    },
    textSmall: {
        fontSize: 9,
        color: '#000'
    }
}
