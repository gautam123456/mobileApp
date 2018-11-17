import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ButtonDuo from './lib/ButtonDuo';
import Button from './lib/Button';
import Header from './lib/Header';
import CopyClipboard from './lib/CopyClipboard';
import { colors } from './lib/src/styles/index.style';
import { ROUTES } from '../constants';
import Text from './lib/LPText';


class ReferAndEarn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: 0
        }
    }

    handleButtonPress = (button) => {
        this.setState({button});
    }

    handleLoginButtonPress = () => {
        this.props.navigation.navigate(ROUTES.LOGIN);
    }

    get button0() {
        const { details } = this.props.userDetails,
            refCode = details ? details.refCode : null
        let content = <Text style={styles.text}> YOUR <Text style={styles.bold}>LOOK</Text>PLEX INVITE CODE</Text>;

            if(!refCode){
                content = <Text style={styles.text}>PLEASE LOGIN TO SEE YOUR INVITE CODE</Text>;
            }

        return (
            <View style={styles.credits}>
                <Text style={styles.text}>Lookplex Refer and Earn Program lets you invite friends to join Lookplex.com</Text>
                <Text style={styles.text}>If your friends accept the invite and sign up with your referral code at Lookplex.com, they get Rs.200 Off on their first appointment.</Text>
                <Text style={styles.text}>Additionally, you will also get Rs.200 Off on your next appointment.</Text>
                <View style={styles.center}>
                    {content}
                    <View style={{ flexDirection: 'row', width: 150 }}><View style={styles.code}><Text style={styles.codeText}> {refCode || 'XXXX'} </Text></View>{refCode ? <CopyClipboard data={refCode} /> : null}</View>
                    { this.loginButton }
                </View>
            </View>
        )
    }

    get loginButton() {
        return (
            <View>
                {!this.props.isLoggedIn ? <Button content='Login to see your code' handleButtonPress={this.handleLoginButtonPress} /> : null}
            </View>
        )
    }

    get button1() {
        const { userDetails: { details }, isLoggedIn } = this.props,
            refCount = details ? details.refCount : 0;

        return (
            <View style={styles.credits}>
                <Text style={styles.text}>Total <Text style={styles.bold}>LOOK</Text>PLEX Credits Earned</Text>
                <Text style={styles.text}>Total Referrals: <Text style={styles.amount}>{isLoggedIn ? (refCount || 0) : 'XXXX'}</Text></Text>
                <Text style={styles.text}>Rewards Earned: <Text style={styles.amount}>{isLoggedIn ? `Rs. ${refCount ? refCount * 200 : 0}` : 'XXXX'}</Text></Text>
                <Text style={styles.text}>As per Lookplex Refer & Earn program, you can avail a discount of Rs.200 on every appointment.</Text>
                <Text style={styles.text}>While booking an appointment, you do not need to apply any coupon code. If eligible, referral discount will be applied automatically to the total bill.</Text>
                { this.loginButton }
            </View>
        )
    }

    render() {
        const content1 = 'Invite & Earn', content2 = 'My credits',
            { button } = this.state,
            { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={[colors.background1, colors.background2]}>
                    <Header navigation={navigation} backgroundColor='transparent' showHome={true}/>
                    <View style={styles.content}>
                        <ButtonDuo active={button} content1={content1} content2={content2} handleButtonPress={this.handleButtonPress}/>
                        { button === 0 ? this.button0 : this.button1 }
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        isLoggedIn: state.userDetails.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferAndEarn);

const styles = {
    content: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 25,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        height: 130
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
        borderColor: '#eee',
        padding: 8,
        flexDirection: 'row',
        backgroundColor: '#f7e5ff',
        alignItems: 'center'
    },
    codeText: {
        fontSize: 15,
        fontWeight: '900'
    },
    credits: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
        padding: 10,
        borderRadius: 3,
        elevation: 5,
        position: 'absolute',
        marginTop: 100
    },
    amount: {
        fontSize: 25,
        fontWeight: '900'
    }
}

