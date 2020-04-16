import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputValidator = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be between 1 and 99',
                [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summary}>
            <BodyText>Chosen Number is:</BodyText>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <MainButton onPress={() => props.startGame(selectedNumber)}>Start Game</MainButton>
        </Card>
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} >
            <View style={styles.screen}>
                <BodyText style={styles.title}>The Game Screen</BodyText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number:</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={numberInputValidator}
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' color={Colors.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' color={Colors.primary}
                                onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 2,

    },
    button: {
        flex: 1,
        padding: 10
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summary: {
        marginTop: 20
    }
});

export default StartGameScreen;