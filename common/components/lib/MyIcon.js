import React from 'react';
import { Icon } from 'native-base';
import { MATERIAL_ICONS } from '../../constants';

export default class MyIcon extends React.Component {

    render() {
        const {name, onPress, style} = this.props;

        return (
            <Icon name={name}
                onPress={onPress}
                style={[styles.icon, style]}
                type={MATERIAL_ICONS}
            />
        );
    }
}

const styles = {
    icon: {
        color: '#fff',
        overflow: 'hidden',
        fontSize: 22
    }
}
