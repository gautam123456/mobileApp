import React from 'react';
import Toast from 'react-native-easy-toast';

export default class MyToast extends React.Component {
    render() {
        const { position, positionValue } = this.props;
        return (
            <Toast
                ref="toast"
                style={{ backgroundColor: '#f89406' }}
                position={position || 'bottom'}
                positionValue={positionValue || 100}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={1}
                textStyle={{ color: '#fff' }}
            />
        );
    }

    componentDidMount() {
        this.props.handleToastRef(this.refs.toast);
    }
}
