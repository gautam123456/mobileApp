import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import MyIcon from './MyIcon';
import { bookingDetailsChanged } from '../../actions';
import Text from './LPText';

class ServiceMenu extends React.Component {
    render() {
        const { item: { name, condition, cost}, id } = this.props.itemDetail,
            { discount, count, hideControl } = this.props;

        return (
            <View style={styles.menu}>
                <View style={styles.desc}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.condition}>{condition}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.amount}>Rs.{parseFloat(cost - (cost * discount / 100)).toFixed(2)}</Text>
                    {discount ? <Text style={styles.discount}><Text style={styles.strike}>{cost}</Text> ({discount}% off)</Text>: null }
                </View>
                <View style={styles.action}>

                    { count && !hideControl ? 
                        <TouchableOpacity onPress={this.handleRemoveItemPress}>
                            <MyIcon name='remove-circle'
                                onPress={this.handleRemovePress}
                                style={styles.icon}
                            />
                        </TouchableOpacity> : null }

                    { count ? <Text style={styles.count}>{count}</Text> : null }
                        
                    { !hideControl ? <TouchableOpacity onPress={this.handleAddItemPress}>
                            <MyIcon name='add-circle'
                                onPress={this.handleAddPress}
                                style={styles.icon}
                            />
                        </TouchableOpacity> : null }
                </View>
            </View>
        );
    }

    handleAddItemPress = () => {
        this.bookingDetailsChanged(1);
    }

    handleRemoveItemPress = () => {
        this.bookingDetailsChanged(0);
    }

    bookingDetailsChanged = (operation) => {
        const { itemDetail: { id, item: { name, cost } }, count, discount} = this.props;
        this.props.bookingDetailsChanged({ id, name, cost, count, operation, discount });
    }
}

function mapStateToProps(state) {
    return {
        discount: state.bookingDetails.discount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookingDetailsChanged: (options) => {
            dispatch(bookingDetailsChanged(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceMenu);

const styles = {
    menu: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 23,
        color: '#ccc'
    },
    strike: {
        textDecorationLine: 'line-through'
    },
    desc: {
        flex: 6
    },
    price: {
        flex: 2,
        alignItems: 'center'
    },
    action: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    discount: {
        fontSize: 10
    },
    count: {
        paddingLeft: 4,
        paddingRight: 4
    },
    name: {
        fontWeight: '900'
    },
    amount: {
        fontWeight: '900',
        fontSize: 12
    }
}
