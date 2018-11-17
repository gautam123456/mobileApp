import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LOOKPLEX_URL, ROUTES } from '../constants';
import Text from './lib/LPText';

export default class Footer extends React.Component {

    render() {
        const HEADER_FALSE = 'noHeader=true';

        return (
            <View style={styles.content}>
                <View style={styles.footerContainer}>
                    <View style={styles.parent}>
                        <TouchableOpacity onPress={this.navigateTo.bind(this, LOOKPLEX_URL + 'about-us?' + HEADER_FALSE)}>
                            <Text style={styles.link}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigateTo.bind(this, LOOKPLEX_URL + 'privacy-policy?' + HEADER_FALSE)}>
                            <Text style={styles.link}>Privacy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigateTo.bind(this, LOOKPLEX_URL + 'refund-policy?' + HEADER_FALSE)}>
                            <Text style={styles.link}>Refund and Cancellation Policy</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.parent}>
                        <TouchableOpacity onPress={this.navigateTo.bind(this, LOOKPLEX_URL + 'contact-us?' + HEADER_FALSE)}>
                            <Text style={styles.link}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.navigateTo.bind(this, LOOKPLEX_URL + 'terms-of-service?' + HEADER_FALSE)}>
                            <Text style={styles.link}>Terms of Service</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.disclaimerContainer}>
                    <Text style={styles.disclaimer}>2017-2018 Lookplex. All rights reserved.</Text>
                </View>
            </View>
        )
    }

    navigateTo(uri) {
        this.props.navigation.navigate(ROUTES.WEB_VIEW, { uri });
    }
}

const styles = {
    content: {
        padding: 15,
        backgroundColor: '#000',
        flex: 1,
        marginTop: 20,
        elevation: 10
    },
    footerContainer: {
        flexDirection: 'row'
    },
    parent: {
        flex: 1
    },
    link: {
        color: '#888',
        fontSize: 14,
        marginBottom: 15
    },
    disclaimerContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 40,
        paddingTop: 10
    },  
    disclaimer: {
        fontSize: 12,
        color: '#666',
    }
}
