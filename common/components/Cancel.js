/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ActivityHeader from './lib/ActivityHeader';
import { View, Picker } from 'react-native';
import { makeAPICall } from '../actions';
import Button from './lib/Button';
import { connect } from 'react-redux';
import { API_PATH, ROUTES } from '../constants';
import Overlay from './lib/Overlay';
import MyToast from './lib/Toast';
import Text from './lib/LPText';

const REASONS = [
    'Something urgent came up',
    'Not well',
    'Want to change the service',
    'Expected an earlier slot',
    'My reason is not listed'
];

class Cancel extends React.Component {

    constructor(props) {
        super(props);

        let { params } = this.props.navigation.state,
            id = '';

        if(params){
            id = params.bookingID;
        }
        this.state = {
            id,
            reason: '',
        }
    }

    render() {
        const { id, reason } = this.state;

        return (
            <View style={styles.services}>
                <ActivityHeader heading={'Cancel Booking'} navigation={this.props.navigation}/>
                <MyToast handleToastRef={this.saveToastRef}/>
                <Overlay />
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View><Text>Booking ID : {id}</Text></View>
                        <Picker
                            style={{ flex: 1, marginTop: -300 }}
                            selectedValue={this.state.reason + ''}
                            onValueChange={this.reasonPicked}>
                            <Picker.Item label={'Please select reason for cancellation'} value={''} />
                            {REASONS.map(reason => {
                                return <Picker.Item key={reason + ''} label={reason + ''} value={reason + ''} />
                            })}
                        </Picker>
                        <Button content="Cancel" handleButtonPress={this.handleCancelSubmit} />
                    </View>
                </View>
            </View>
        )
    }

    reasonPicked = (reason) => {
        this.setState({reason});
    }

    navigateBack = () => {
        this.props.navigation.navigate(ROUTES.MY_APPOINTMENTS);
    }

    saveToastRef = (toastRef) => {
        this.toast = toastRef;
    }

    handleCancelSubmit = () => {
        const { id, reason } = this.state,
            { userAgent } = this.props,
            payload = { bookingid: id, reason, source: userAgent },
            url = API_PATH + '/cancelbooking';
        
        this.props.makeAPICall({ url, payload, successCallback: this.handleCancelSubmitSuccess, errorCallback: this.handleCancelSubmitError });
        
    }

    handleCancelSubmitSuccess = (response) => {
        this.props.navigation.navigate(ROUTES.MY_APPOINTMENTS, { notify: true });
    }

    handleCancelSubmitError = ({ message }) => {
        this.toast.show(message || 'Some issue occured, please contact support', 500);
    }
}

function mapStateToProps(state) {
    return {
        userAgent: state.misc.userAgent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cancel);

const styles = {
    services: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#efefef'
    },
    card: {
        flex: 1,
        elevation: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 10
    },
    textAreaContainer: {
        borderColor: '#eee',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        marginBottom: 100
    }
}