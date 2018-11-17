import React, { Component } from 'react';
import { View, Animated, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { HEADER_SCROLL_DISTANCE } from '../../../../constants';

export default class SliderEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
        }
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;
        //     imageTranslate = this.state.scrollY.interpolate({
        //         inputRange: [0, HEADER_SCROLL_DISTANCE],
        //         outputRange: [0, -50],
        //         extrapolate: 'clamp',
        //     }),
        //     imageOpacity = this.state.scrollY.interpolate({
        //         inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        //         outputRange: [1, 1, 0],
        //         extrapolate: 'clamp',
        //     });

            
            
        //     styles.image = {
        //         resizeMode: 'contain',
        //         borderRadius: 1,
        //         borderTopLeftRadius: 2,
        //         borderTopRightRadius: 2,
        //         flex: 1,
        //         alignSelf: 'center',
        //         width: undefined,
        //         height: undefined
        //     }

        // console.log("Styles Image");
        // console.log(imageTranslate);

            //, ...{ opacity: imageOpacity, transform: [{ translateY: imageTranslate }]}
        return parallax ? (
            <ParallaxImage
                source={{uri: illustration}}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
              source={{uri: illustration}}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        // const uppercaseTitle = title ? (
        //     <Text
        //       style={[styles.title, even ? styles.titleEven : {}]}
        //       numberOfLines={2}
        //     >
        //         { title.toUpperCase() }
        //     </Text>
        // ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
            //   onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, styles.imageContainerEven]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                {/* <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View> */}
            </TouchableOpacity>
        );
    }
}
