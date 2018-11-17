import React from 'react';
import { View, ScrollView } from 'react-native';
import { colors } from './lib/src/styles/index.style';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from './lib/Header';
import ButtonDuo from './lib/ButtonDuo';
import { makeAPICall, getUserDetails } from '../actions';
import Appointment from './lib/Appointment';
import NothingToShow from './lib/NothingToShow';
import { API_PATH, ROUTES } from '../constants';
import Overlay from './lib/Overlay';


class MyAppointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: 0,
            ongoingList: [],
            historyList: []
        };

        this.ongoingList = [];
        this.historyList = [];
    }

    handleButtonPress = (button) => {
        this.setState({ button });
    }

    get button0() {
        const { ongoingList } = this.state,
            { navigation } = this.props;

        return (
            <View style={styles.appointments}>
                {ongoingList.length ? ongoingList.map(ele => <Appointment key={ele.bookingID} item={ele} navigation={navigation} isUpcoming={true} />) : <NothingToShow />}
            </View>
        )
    }

    get button1() {
        const { historyList } = this.state,
            { navigation } = this.props;;

        return (
            <View style={styles.appointments}>
                {historyList.length ? historyList.map(ele => <Appointment key={ele.bookingID} item={ele} navigation={navigation} isUpcoming={false} />) : <NothingToShow /> }
            </View>
        )
    }

    componentDidMount() {
        url = API_PATH + '/getmybookings';
        this.props.makeAPICall({ url, payload: {}, successCallback: this.handleAppointmentCallSuccess, errorCallback: this.handleAppointmentCallError });  
        
    }

    handleAppointmentCallError = () => {
        this.props.navigation.navigate(ROUTES.LOGIN);
    }

    handleAppointmentCallSuccess = (data) => {
        this.addBookingType(data.customerBookingList);
    }

    addBookingType(list) {
        list.map(function (appointment) {
            this.updateBookingType(appointment);
        }, this);

        this.setState({ ongoingList: this.ongoingList, historyList: this.historyList });
    }

    updateBookingType(appointment) {
        if (!appointment.formattedDate){
            return;
        }

        const bookingDate = new Date(appointment.formattedDate.split(' at')[0] + appointment.formattedDate.split(' at')[1]),
            currentDay = new Date();
        

        if (bookingDate < currentDay || appointment.status == 'cancelled'){
            this.historyList.push(appointment);
        }else{
            this.ongoingList.push(appointment);
        }
    
    }

    render() {
        const content1 = 'Upcoming', content2 = 'History',
            { button } = this.state,
            { navigation } = this.props;

        return (
            <ScrollView style={{ flex: 1 }}>
                <Overlay />
                <LinearGradient colors={[colors.background1, colors.background2]} style={{padding: 10}}>
                    <Header navigation={navigation} backgroundColor='transparent' showHome={true}/>
                    <View style={styles.content}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ButtonDuo active={button} content1={content1} content2={content2} handleButtonPress={this.handleButtonPress} /></View>
                            {button === 0 ? this.button0 : this.button1}
                    </View>
                </LinearGradient>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);

const styles = {
    content: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 25,
        flex: 1
    },
    appointments: {
        flex: 1
    },
    text: {
        color: '#555',
        fontSize: 15,
        marginBottom: 15
    },
    description: {
        fontSize: 14
    },
    center: {
        alignItems: 'center'
    },
    bold: {
        fontWeight: '900'
    },
    code: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8
    },
    credits: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
        padding: 10,
        borderRadius: 3,
        elevation: 15,
        position: 'absolute',
        marginTop: 200
    },
    amount: {
        fontSize: 25,
        fontWeight: '900'
    }
}

