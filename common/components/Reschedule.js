/**
 * Created by gautam on 12/12/16.
 */
import React from 'react';
import ActivityHeader from './lib/ActivityHeader';
import ActivityFooter from './lib/ActivityFooter';
import { View } from 'react-native';
import { makeAPICall} from '../actions';
import MyToast from './lib/Toast';
import {connect} from 'react-redux';
import Button from './lib/Button';
import DatePicker from './lib/DatePicker';
import { API_PATH, ROUTES, TIME } from '../constants';
import Overlay from './lib/Overlay';
import Text from './lib/LPText';

class Reschedule extends React.Component {

  constructor(props) {
    super(props);

    let { params } = this.props.navigation.state,
      id = '';

    if (params) {
      id = params.bookingID;
    }

    this.state = {
      id,
      timing: {}
    }
  }

  render() {
    const {id} = this.state;

    return (
      <View style={styles.services}>
        <ActivityHeader heading = { 'Reschedule Booking' } navigation={this.props.navigation}/>
        <MyToast handleToastRef={this.saveToastRef} />
        <Overlay />
        <View style={styles.container}>
          <View style={styles.card}>
            <View><Text>Booking ID : {id}</Text></View>
            <View>
              <DatePicker scheduleHandler = {this.scheduleHandler} />
            </View>
            <View style={{marginTop: 100}}></View>
            <Button content="RESCHEDULE" handleButtonPress={this.handleSubmit} />
          </View>
        </View>
        <ActivityFooter prev={this.navigateBack} next = {this.navigateBack}/>
      </View>
    )
  }

  saveToastRef = (toast) => {
    this.toast = toast;
  }

  navigateBack = () => {
    this.props.navigation.navigate(ROUTES.MY_APPOINTMENTS);
  }

  scheduleHandler = (timing) => {
    this.setState({timing});
  }

  handleSubmit = () => {
    const { timing: { date, month, time, year }, id } = this.state,
      { userAgent } = this.props,
      payload = { bookingid: id, datetime: month + '/' + date + '/' + year + '__' + time, source: userAgent },
      url = API_PATH + '/reschedulebooking';
    if(date && month && time && year){
        this.props.makeAPICall({ url, payload, successCallback: this.handleSubmitSuccess, errorCallback: this.handleSubmitError });
    }else{
        this.toast.show(TIME, 500);
    }
  }

  handleSubmitSuccess = (response) => {
    this.props.navigation.navigate(ROUTES.MY_APPOINTMENTS, { notify: true });
  }

  handleSubmitError = ({ message }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Reschedule);

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