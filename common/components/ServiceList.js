import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Thumbnail from './lib/Thumbnail';
import ServiceMenu from './lib/ServiceMenu';
import Text from './lib/LPText';

const IMG_PATH = require('../assets/images/logo.png');

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeServiceId: ''
        }
    }

    handleMenuInfoPress = (activeServiceId) => {
        this.setState({ activeServiceId });
    }

    renderMenu(data){
        const {id} = data,
            { bookingDetails } = this.props;

        return (<ServiceMenu key={id} itemDetail={data} count={bookingDetails.services[id] ? bookingDetails.services[id].count : 0}/>);
    }

    renderHeaderAndMenu({id: parentId, name, serviceItemList, superParentId}) {
        return (
            <View key={parentId + '-' +superParentId} style={styles.menuContainer}>
                <View style={styles.header}>
                    <Thumbnail name={name} />
                    <Text style={styles.headerText}>{name}</Text>
                </View>
                {serviceItemList.map(item => {
                    return this.renderMenu({ item, id: `${superParentId}-${parentId}-${item.id}`});
                })}
           </View> 
        )
    }

    render() {
        const { activeServiceId } = this.state,
            { services: { id: superParentId, serviceCategoryList } } = this.props;

        return (
            <View>
                {serviceCategoryList.map(({ id, name, serviceItemList}) => {
                    return this.renderHeaderAndMenu({id, name, serviceItemList, superParentId});
                })}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookingDetails: state.bookingDetails
    };
}

export default connect(mapStateToProps)(ServiceList);


const styles = {
    menuContainer: {
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 3
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f8f9fc',
        padding: 10,
    },
    headerText: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '900'
    }
}
