import React from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, View } from 'react-native';
import Text from './lib/LPText';

const items = [{
    IMG_PATH: require('../assets/images/testimonial1.png'),
    title: 'lol'
},
{
    IMG_PATH: require('../assets/images/testimonial2.png'),
    title: 'lol'
}];

const width = Dimensions.get('window').width;

export default class Testimonial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width,
            height: Dimensions.get('window').height
        }
    }

    _renderItem({ item, index }, parallaxProps) {
        const { IMG_PATH } = item;
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={IMG_PATH}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.8}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
            </View>
        );
    }

    render() {
        const { width } = this.state;

        return (
            <Carousel
                data={items}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={width - 20}
                hasParallaxImages={true}
            />
        );
    }
}

const styles = {
    imageView: {
        height: 200,
        alighItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginBottom: 200
    },
    image: {
        resizeMode: 'contain',
        flexWrap: 'wrap',
        height : 200
    },
    imageContainer: {
        height: 200,
        resizeMode: 'contain',
        flexWrap: 'wrap',
        padding: 5
    }
}