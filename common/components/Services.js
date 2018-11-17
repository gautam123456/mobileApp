import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import Filter from './lib/Filter';
import ServiceList from './ServiceList';
import StaticContent from './StaticContent';
import { View } from 'react-native';
import { getItems, getUserDetails } from '../actions';

class Services extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeId: 5
        }
    }

    handleFilterPress = (activeId) => {
        this.setState({ activeId});
    }

    componentDidMount() {
        const { items, getItems, getUserDetails } = this.props;
        if(!items){
            getItems();
            getUserDetails();
        }
    }

    render() {
        const { activeId } = this.state,
            { items } = this.props;

        if (!items || !Array.isArray(items.serviceList)){
            return null;
        }

        const activeService = items.serviceList.filter(ele => ele.id === activeId),
            services = activeService[0],
            { serviceDescriptionHeading: heading, serviceDescription: description } = services;

        return (
            <View style={styles.services}>
                <Filter activeId={activeId} handleFilterPress={this.handleFilterPress}/>
                <ServiceList services={services} />
                <StaticContent content={{ heading, description}}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.misc.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails());
        },
        getItems: () => {
            dispatch(getItems());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);

const styles = {
    services: {
        padding: 5
    }
}
