import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    fontColor: '#777',
    background1: '#3F5EFB', // ff69b4
    background2: '#ff69b4' // fc5c7d
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 20
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 0,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 0,
        marginTop: -18
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
