import React from 'react';
import { View, ScrollView } from 'react-native';
import { colors } from './lib/src/styles/index.style';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from './lib/Header';
import MyStatusBar from './lib/MyStatusBar';
import { addNotification } from '../actions';
import Card from './lib/Card';
import Text from './lib/LPText';

class MyNotifications extends React.Component {
    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        if(params){
            this.props.addNotification(params.notification);
        }
        
    }

    render() {
        const { notifications, navigation } = this.props;

        return (
            <ScrollView style={{ flex: 1 }}>
                <MyStatusBar />
                <LinearGradient colors={[colors.background1, colors.background2]} style={{ padding: 10 }}>
                    <Header navigation={navigation} backgroundColor='transparent' showHome={true} />
                    <Text style={styles.title}>NOTIFICATIONS</Text>
                    <View style={styles.content}>
                            {notifications.map(ele => {
                                return <Card {...ele} navigation={navigation}/>
                            })}
                        
                    </View>
                </LinearGradient>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.userDetails.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addNotification: (notification) => {
            dispatch(addNotification(notification));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);

const styles = {
    content: {
        marginTop: 10,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 25,
        flex: 1
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        fontWeight: '800'
    }
}

