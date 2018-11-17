import React from 'react';
import { Image } from 'react-native';
import { S3_IMAGE_PATH } from '../../constants';

const imagePath = S3_IMAGE_PATH + '/icons/';

export default class Thumbnail extends React.Component {
    render() {
        let { name } = this.props;
        name = name.replace('+', '%2B');
        return (
            <Image style={styles.filterImage} source={{uri: `${imagePath}${name}.png`}} />
        );
    }
}

const styles = {
    filterImage: {
        height: 40,
        width: 40
    }
}
