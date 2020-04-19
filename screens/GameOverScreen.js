import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

import Colors from '../constants/Colors';
const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    fadeDuration={1000}
                    resizeMode='cover'
                    source={require('../assets/example-image.png')} 
                    // source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                    />
            </View>

            <BodyText>Your phone needed <Text>{props.roundsNumber}</Text> to guess the number: <Text style={styles.highLight}>{props.userChoice}</Text></BodyText>
            <Button title='Restart Game!' onPress={props.onRestart} />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: Dimensions.get('window').width * 0.6 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highLight: {
        color: Colors.primary
    }
})

export default GameOverScreen;