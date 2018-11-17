import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Button from '../lib/Button';
import { colors } from './src/styles/index.style';
import { ROUTES } from '../../constants';
import Text from './LPText';

export default class Appointment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailView: false
        }
    }

    handleCancelButtonPress = () => {
        this.props.navigation.navigate(ROUTES.CANCEL, { bookingID: this.props.item.bookingID});
    }

    handleRescheduleButtonPress = () => {
        this.props.navigation.navigate(ROUTES.RESCHEDULE, { bookingID: this.props.item.bookingID });
    }

    get actionButtons() {
        return (
            <View style={styles.actionButtons}>
                <Button content='Cancel' handleButtonPress={this.handleCancelButtonPress} icon='cancel' style={{ backgroundColor: colors.background2 }}/>
                <Button content='Reschedule' handleButtonPress={this.handleRescheduleButtonPress} icon='edit'/>
            </View>
        )
    }

    get header() {
        return (
            <View style={styles.header}>
                <Text style={styles.menuItem1}>Service Name</Text>
                <Text style={styles.menuItem2}>Price</Text>
                <Text style={styles.menuItem3}>Qnty.</Text>
            </View>
        )
    }

    get listOfServices() {
        const { serviceItemListString } = this.props.item,
            serviceItemList = serviceItemListString.replace(/\//g, ''),
            serviceItemListObj = JSON.parse(serviceItemList);

        return (
            <View>
                {serviceItemListObj.map(({cost, quantity, name}) => {
                    return (
                        <View style={styles.menu}>
                            <Text style={styles.menuItem1}>{name}</Text>
                            <Text style={styles.menuItem2}>{cost}</Text>
                            <Text style={styles.menuItem3}>{quantity}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    get bookingDetails() {
        const { serviceAmountBeforeDiscount, refDiscount, discount, adjustment, payAmount } = this.props.item;
        return (
            <View style={{marginTop: 10}}>
                <View style={styles.menu}> 
                    <Text style={styles.bold}>
                        Subtotal: 
                    </Text>
                    <Text>
                        Rs.{serviceAmountBeforeDiscount}
                    </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.bold}>
                        Referral Discount:
                    </Text>
                    <Text>
                        Rs.{refDiscount}
                    </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.bold}>
                        Discount:
                    </Text>
                    <Text>
                        {discount}
                    </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.bold}>
                        Adjustments:
                    </Text>
                    <Text>
                        Rs.{adjustment}
                    </Text>
                </View>
                <View style={styles.menu}>
                    <Text style={styles.bold}>
                        Amount Payable:
                    </Text>
                    <Text>
                        Rs.{payAmount}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const { item, isUpcoming } = this.props,
            { formattedDate, bookingID, customerAddress, payAmount, status } = item,
            { detailView } = this.state;
        
        return (
            <View style={styles.item}>
                <View style={styles.header}>
                    <Text style={styles.bold}>Booking Id: {bookingID}</Text>
                    <Text style={styles[status]}> {status.toUpperCase()}</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.row}>
                        <Text style={styles.bold}>Address: </Text>
                        <Text style={styles.normal}>{customerAddress}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.bold}>Appointment Time: </Text>
                        <Text style={styles.normal}> {formattedDate}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.bold}>Amount payable: </Text>
                        <Text style={styles.normal}> Rs.{payAmount}</Text>
                    </View>
                </View>
                <View>
                    {detailView ? [this.header, this.listOfServices, this.bookingDetails, ...[ isUpcoming ? this.actionButtons : null ]] : null }
                </View>
                <View style={styles.showMore}>
                    <TouchableOpacity onPress={this.showToggle}>
                        <Text style={{ color: 'blue' }}>{detailView ? 'Hide Details' : 'View Details'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    showToggle = () => {
        this.setState({ detailView: !this.state.detailView});
    }
}

const styles = {
    header: {
        backgroundColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#fff'
    },
    menuItem1: {
        flex: 4,
        justifyContent: 'center'
    },
    menuItem2: {
        flex: 2,
        justifyContent: 'center'
    },
    menuItem3: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        padding: 10,
        borderRadius: 3,
        elevation: 5,
        marginBottom: 20
    },
    bold: {
        fontWeight: '900',
        flex: 2
    },
    normal: {
        padding: 3,
        flex: 3
    },
    booked: {
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: 2,
        paddingVertical: 1,
        paddingHorizontal: 4
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,
        padding: 2
    },
    showMore: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        padding: 5,
        alignItems: 'center'
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
}
