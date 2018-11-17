/**
 * Created by rgautam on 1/13/17.
 */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Button from './lib/Button';
import { colors } from './lib/src/styles/index.style';
import { ROUTES } from '../constants';
import Text from './lib/LPText';

export default class AddAddress extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     address: this.props.address
        // }
    }

    render() {

        const { address: {address, city, landmark }, active} = this.props,
            activeStyle = active ? { backgroundColor: 'rgb(216, 222, 254)'} : {};

        return (
            <View style={styles.address}>
                <TouchableOpacity onPress={this.selectAddress} style={{...styles.dash}}>
                    <View style={activeStyle}>
                    <View style={{ ...styles.padding5 }}>
                        <View style={{...styles.row}}>
                            <Text style={styles.title}>Address:</Text><Text style={styles.desc}>{address}</Text>
                        </View>
                        <View style={{ ...styles.row }}>
                            <Text style={styles.title}>Landmark:</Text><Text style={styles.desc}>{landmark}</Text>
                        </View>
                        <View style={{ ...styles.row }}>
                            <Text style={styles.title}>City:</Text><Text style={styles.desc}>{city}</Text>
                        </View>
                    </View>
                    <View style={{...styles.row, ...styles.padding5}}>
                        <Button content='Delete' handleButtonPress={this.handleDeleteButtonPress} icon="delete" style={{ backgroundColor: colors.background2 }} />
                        <View style={{ width: 20 }}></View>
                        <Button content='Edit' handleButtonPress={this.handleEditButtonPress} icon="edit" />
                    </View>
                    </View>
                </TouchableOpacity>
            </View> 
        )
    }

    handleEditButtonPress = () => {
        this.props.navigation.navigate(ROUTES.ADD_ADDRESS, { op: 'edit', address: this.props.address });
    }

    handleDeleteButtonPress = () => {
        this.props.navigation.navigate(ROUTES.ADD_ADDRESS, { op: 'delete', address: this.props.address });
    }

    componentDidMount = () => {
        const { index, selectedAddress, address } = this.props;
        if (index == 0) {
            selectedAddress(address);
        }
    }

    selectAddress = () => {
        const { selectedAddress, address} = this.props;
        selectedAddress(address);
    }
}

const styles = {
    address: {
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: 'dotted',
        borderColor: '#ccc'
    },
    row: {
        flexDirection: 'row' 
    },
    title: {
        flex: 1, fontWeight: '900'
    },
    desc: {
        flex: 3
    },
    padding5: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    dash: {
        padding: 5
    }
}


