import React from 'react';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import { makeAPICall } from '../../actions';
import { API_PATH } from '../../constants';
import Text from './LPText';

class DateWidget extends React.Component {
    constructor(props) {
        super(props);


        //const { timing } = this.props;
        //let time, date, month, year;

        // if (timing) {
        //     time = timing.time;
        //     date = timing.date;
        //     month = timing.month;
        //     year = timing.year;
        // }

        const defaultDay = new Date();

        this.state = {
            time: '',
            date: defaultDay.getDate(),
            month: defaultDay.getMonth() + 1,
            year: defaultDay.getFullYear(),
            serverTime: defaultDay,
            availableSlotList: []
        }
    }

    renderDate = () => {
        let days = this.getNumberOfDays();

        return (
            <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.date + ''}
                onValueChange={this.datePicked}>
                <Picker.Item label={'Date'} value={''} />
                {days.map(day => {
                    return this.renderDay(day);
                })}
            </Picker>
        )
    }
    

    renderMonth = (month) => {
        return (
            <Picker.Item key={month[1] + ''} value={month[0] + ''} label={month[1] + ''} />
        )
    }

    renderMonths = () => {
        const months = this.getMonths();
        return (
            <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.month + ''}
                onValueChange={this.monthPicked}>
                <Picker.Item label={'Month'} value={''} />
                {
                    months.map(month => {
                        return this.renderMonth(month);
                    })
                }
            </Picker>
        )
    }

    getMonths = () => {
        const { year, serverTime } = this.state;
        let months = [[1, 'Jan'], [2, 'Feb'], [3, 'March'], [4, 'April'], [5, 'May'], [6, 'June'], [7, 'July'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
        if (year == serverTime.getFullYear()) {
            const currentMonth = serverTime.getMonth() + 1;
            months = months.slice(currentMonth - 1, months.length);
        }
        return months;
    }

    renderDay = (day) => {
        return (
            <Picker.Item key={day + ''} label={day + ''} value={day + ''} />
        )
    }

    getNumberOfDays = () => {
        const { month, year, serverTime } = this.state;
        let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

        switch (month + '') {
            case '4':
            case '6':
            case '9':
            case '11': days[28] = 29; days[29] = 30;
                break;
            case '2':
                break;
            default: days[28] = 29; days[29] = 30; days[30] = 31;
        }

        const serverMonth = serverTime.getMonth() + 1,
            serverYear = serverTime.getFullYear();

        if ((month == serverMonth) && (serverYear == year)) {
            let currentDate = serverTime.getDate();
            days = days.slice(currentDate - 1);
        }

        return days;
    }

    componentDidMount() {
        this.fetchTimeSlots({ defaultCall: true });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.city !== nextProps.city) {
            let options = { defaultCall: true };
            const { date, month, year } = this.state;
            if (month && date && year) {
                options = { date: `${month}/${date}/${year}` };
            }
            this.fetchTimeSlots({ city: nextProps.city, ...options });
        }
    }

    fetchTimeSlots = ({ defaultCall, date, city }) => {
        let dateObj = {};
        if (date) {
            dateObj = { date };
        }

        const payload = { ...{ city: city || this.props.city }, ...dateObj };

        const successCallback = ({ availableSlotList, date, status }) => {
            if (defaultCall) {
                this.updateDefaultTime({ availableSlotList, date });
            } else {
                this.setState({ availableSlotList });
            }

            if (availableSlotList.length == 0) {
                this.props.toast.show(status);
            }
        }

        this.props.makeAPICall({ url: API_PATH + '/availableslot', payload, successCallback, errorCallback: successCallback });
    }

    updateDefaultTime({ availableSlotList, date }) {
        const dateArray = date.split('/'),
            formattedDate = new Date();

        formattedDate.setDate(dateArray[1]);
        formattedDate.setMonth(dateArray[0] - 1);
        formattedDate.setFullYear(dateArray[2]);

        this.setState({ availableSlotList, serverTime: formattedDate, year: formattedDate.getFullYear(), month: formattedDate.getMonth() + 1, date: formattedDate.getDate() });
    }

    renderTime = () => {
        const { time } = this.state,
            selectedTimeSlot = time ? time.split('_').join(' ') : time;

        return (
            <Picker
                style={{ width: 150 }}
                selectedValue={selectedTimeSlot}
                onValueChange={this.timeEntered}>
                <Picker.Item label={'Time'} value={''} />
                {
                    this.state.availableSlotList.map(ele => {
                        return <Picker.Item key={ele + ''} label={ele + ''} value={ele + ''} />;
                    })
                }
            </Picker>
        )
    }

    render() {
        let timing = '', meridian = '';
        const { time, date, month, year } = this.state;

        if (time) {
            timing = time.split('_')[0];
            meridian = time.split('_')[1];
        }

        return (
            <View style={{ marginTop: 20, height: 150 }}>
                <View><Text>Pick your slot</Text></View>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={year}
                            onValueChange={this.yearPicked}>
                            <Picker.Item key='2018' label={'2018'} value={'2018'} />
                            <Picker.Item key='2019' label={'2019'} value={'2019'} />
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderMonths()}
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderDate()}
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    {this.renderTime()}
                </View>
            </View>
        )
    }

    isLastDayOfYear = (date) => {
        const nextDate = new Date(date.getTime());
        nextDate.setDate(date.getDate() + 1);
        return nextDate.getFullYear() !== date.getFullYear();
    }

    isLastDayOfMonth = (date) => {
        const nextDate = new Date(date.getTime());
        nextDate.setDate(date.getDate() + 1);
        return nextDate.getMonth() !== date.getMonth();
    }

    isCurrentDayOver = (date) => {
        return date.getHours() > 15;
    }

    datePicked = (date) => {
        this.setState({ date, time: '' }, this.updateScheduleHandler({ date, time: '' }));
        const { month, year } = this.state;
        if(date && month && year){
            this.fetchTimeSlots({ date: `${month}/${date}/${year}` });
        }
    }

    monthPicked = (month) => {
        this.setState({ month, date: '' }, this.updateScheduleHandler({ month, date: '' }));
    }

    yearPicked = (year) => {
        this.setState({ year, date: '', month: '' }, this.updateScheduleHandler({ year, date: '', month: '' }));
    }

    timeEntered = (time) => {
        const { year, date, month } = this.state;
        time = time.split(' ').join('_');
        this.setState({ time }, this.updateScheduleHandler({ year, date, month, time }));
    }

    updateScheduleHandler = (options) => {
        this.props.scheduleHandler(Object.assign({}, this.state, options));
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeAPICall: (data) => {
            dispatch(makeAPICall(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(DateWidget);
