import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import Thumbnail from '../lib/Thumbnail';
import Text from './LPText';

const IMG_PATH = require('../../assets/images/icons.png');

class Filter extends React.Component {
    getFilterItem({id, name}) {
        const {activeId} = this.props;

        styles.filterText = styles.inActiveFilter;
        
        if(activeId === id){
            styles.filterText = { ...styles.inActiveFilter, ...styles.activeFilter };
        }

        return (
            <TouchableOpacity key={name} onPress={this.handleFilterPress.bind(this, id)} style={styles.filter}>
                <Thumbnail name={name}/>
                <Text style={styles.filterText}>{name}</Text>
            </TouchableOpacity>
        )
    }

    handleFilterPress(id) {
        this.props.handleFilterPress(id);
    }

    render() {
        const { serviceList: services } = this.props.items;

        return (
            <ScrollView>
                <View style={styles.filters}>
                    {services.map( ele => {
                        return this.getFilterItem(ele)
                    })}
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.misc.items
    };
}

export default connect(mapStateToProps)(Filter);

const styles = {
    filters: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: 5,
        elevation: 3
    },
    filter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inActiveFilter: {
        color: '#777',
        fontWeight: '800'
    },
    activeFilter: {
        fontWeight: '900',
        color: '#3f5efb'
    }
}
