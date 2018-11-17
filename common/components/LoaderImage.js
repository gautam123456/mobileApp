import React from 'react';
import { Image, Dimensions } from 'react-native';

const height = Dimensions.get('window').height + 50,
    width = Dimensions.get('window').width,
    IMG_PATH = '../assets/images/intro/1.png';

export default class LoaderImage extends React.Component {

    render() {
        return (
            <Image style={styles.image}
                source={require(IMG_PATH)} />
        )
    }
}

const styles = {
    image: {
        width,
        height
    }
}
